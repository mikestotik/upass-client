import http from '../../config/http.config.ts';
import { CoreApiUri } from '../../const/api.const.ts';
import { LoginResponse, SignInPayload, SignUpPayload } from './auth.interfaces.ts';

class AuthService {
  public async signUp(payload: SignUpPayload) {
    return http.post<LoginResponse>(CoreApiUri.ACCOUNT, payload).then((res) => res.data);
  }

  public async signIn(payload: SignInPayload) {
    return http.post<LoginResponse>(CoreApiUri.AUTH_SIGN_IN, payload).then((res) => res?.data);
  }

  public async signOut() {
    return http.get<void>(CoreApiUri.AUTH_SIGN_OUT);
  }

  public async refreshAccessToken(refresh: string) {
    return http.post<LoginResponse>(CoreApiUri.AUTH_REFRESH, { refresh }).then((res) => res.data);
  }
}

export const authService = new AuthService();
