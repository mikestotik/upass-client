import { makeAutoObservable, runInAction } from 'mobx';
import { SignUpConfirmationPayload } from '../auth/auth.interfaces.ts';
import { User } from './account.interface.ts';
import { accountService } from './account.service.ts';

export class AccountStore {
  public user!: User;

  constructor() {
    makeAutoObservable(this);
  }

  public async load() {
    const user = await accountService.load();

    return runInAction(() => (this.user = user));
  }

  public async activate(values: SignUpConfirmationPayload) {
    await accountService.activate(values);
  }
}
