import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { LOCAL_STORAGE_TOKENS } from '../../const/storage.const.ts';
import { JWTParser } from '../../utils/jwt.utils.ts';
import { SignInPayload, SignUpConfirmationPayload, SignUpPayload } from './auth.interfaces.ts';
import { authService } from './auth.service.ts';

const getStored = () => {
  return {
    accessToken: localStorage.getItem(LOCAL_STORAGE_TOKENS.accessToken),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_TOKENS.refreshToken),
  };
};

export class AuthStore {
  public accessToken = getStored().accessToken;
  public refreshToken = getStored().refreshToken;

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.accessToken,
      (token) => localStorage.setItem(LOCAL_STORAGE_TOKENS.accessToken, token ?? ''),
    );
    reaction(
      () => this.refreshToken,
      (token) => localStorage.setItem(LOCAL_STORAGE_TOKENS.refreshToken, token ?? ''),
    );
  }

  public get isAuthenticated(): boolean {
    if (!this.accessToken || !this.refreshToken) {
      return false;
    }
    return !new JWTParser(this.refreshToken).isExpired();
  }

  public getUserId() {
    const payload = new JWTParser(this.accessToken!).getPayload();
    if (!payload) return null;
    return payload.sub;
  }

  public setAccessToken = (accessToken: string | null) => {
    runInAction(() => (this.accessToken = accessToken));
  };

  public setRefreshToken = (refreshToken: string | null) => {
    runInAction(() => (this.refreshToken = refreshToken));
  };

  public signIn = async (values: SignInPayload) => {
    const res = await authService.signIn(values);

    this.setAccessToken(res.accessToken);
    this.setRefreshToken(res.refreshToken);
  };

  public async signUp(values: SignUpPayload) {
    const res = await authService.signUp(values);
    console.log(res);
  }

  public async signOut() {
    return authService.signOut().then(() => this.reset());
  }

  public reset(): void {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  }

  public async signUpConfirmation(values: SignUpConfirmationPayload) {
    console.log(values);
  }
}
