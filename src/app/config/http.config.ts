import axios, { AxiosError, HttpStatusCode } from 'axios';
import { CoreApiUri } from '../const/api.const.ts';
import { RoutePaths } from '../const/routes.const.ts';
import { LOCAL_STORAGE_TOKENS } from '../const/storage.const.ts';
import { authService } from '../models/auth/auth.service.ts';
import { router } from '../router/Router.tsx';

interface Queue {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}

const localStorageAccessTokenToken = LOCAL_STORAGE_TOKENS.accessToken;
const localStorageRefreshTokenToken = LOCAL_STORAGE_TOKENS.refreshToken;

const getAccessToken = (): string => {
  return localStorage.getItem(localStorageAccessTokenToken)!;
};

const getRefreshToken = (): string => {
  return localStorage.getItem(localStorageRefreshTokenToken)!;
};

const clearTokens = () => {
  localStorage.removeItem(localStorageAccessTokenToken);
  localStorage.removeItem(localStorageRefreshTokenToken);
};

const http = axios.create({
  baseURL: import.meta.env.VITE_CORE_API_URL,
});

http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (!config.headers.Authorization && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Queue[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)));
  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const exceptionNotUnauthorized = error.response?.status !== HttpStatusCode.Unauthorized;
    const exceptionSignInPage = error.config?.url === RoutePaths.AUTH_SIGN_IN;

    if (exceptionNotUnauthorized || exceptionSignInPage) {
      return Promise.reject(error);
    }

    const originalRequest = { ...error.config, retry: false };

    if (originalRequest.url === CoreApiUri.AUTH_REFRESH) {
      return router.navigate(RoutePaths.AUTH).then(() => Promise.reject(error));
    }

    if (!originalRequest.retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((accessToken) => {
            originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
            return http(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest.retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        authService
          .refreshAccessToken(getRefreshToken())
          .then(({ accessToken }) => {
            localStorage.setItem(localStorageAccessTokenToken, accessToken);
            return accessToken;
          })
          .then((accessToken) => {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            originalRequest.headers!.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(http(originalRequest));
          })
          .catch((err) => {
            router.navigate(RoutePaths.AUTH).then(() => {
              clearTokens();
              processQueue(err, null);
              reject(err);
            });
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);

export default http;
