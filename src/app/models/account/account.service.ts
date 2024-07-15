import { SignUpConfirmationPayload } from '../auth/auth.interfaces.ts';
import { AccountResource } from './account.resource.ts';

class AccountService {
  private readonly resource = new AccountResource();

  public async load() {
    return this.resource.load().then((res) => res?.data);
  }

  public async delete() {
    return this.resource.delete();
  }

  public async activate(payload: SignUpConfirmationPayload) {
    return this.resource.activate(payload);
  }
}

export const accountService = new AccountService();
