import { AccountStore } from './account/account.store.ts';
import { AuthStore } from './auth/auth.store.ts';
import { LoginStore } from './login/login.store.ts';

export class AppStore {
  public readonly authStore = new AuthStore();
  public readonly accountStore = new AccountStore();
  public readonly loginStore = new LoginStore();
}
