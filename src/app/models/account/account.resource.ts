import http from '../../config/http.config';
import { CoreApiUri } from '../../const/api.const.ts';
import { SignUpConfirmationPayload } from '../auth/auth.interfaces.ts';
import { User } from './account.interface.ts';

export class AccountResource {
  public async load() {
    return http.get<User>(CoreApiUri.ACCOUNT);
  }

  public delete() {
    return http.delete(CoreApiUri.ACCOUNT);
  }

  public activate(payload: SignUpConfirmationPayload) {
    return http.post<void>(CoreApiUri.ACCOUNT_ACTIVATE, payload);
  }
}
