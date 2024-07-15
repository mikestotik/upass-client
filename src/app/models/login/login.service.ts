import http from '../../config/http.config.ts';
import { CoreApiUri } from '../../const/api.const.ts';
import { CreatePasswordPayload, Login } from './login.interface.ts';

class LoginService {
  public async load() {
    return http.get<Login[]>(CoreApiUri.LOGIN).then((res) => res?.data);
  }

  public async create(payload: CreatePasswordPayload) {
    return http.post<Login>(CoreApiUri.LOGIN, payload).then((res) => res?.data);
  }

  public async update(id: number, payload: Partial<CreatePasswordPayload>) {
    return http.patch<Login>(`${CoreApiUri.LOGIN}/${id}`, payload).then((res) => res?.data);
  }

  public async delete(id: number) {
    return http.delete(`${CoreApiUri.LOGIN}/${id}`);
  }
}

export const loginService = new LoginService();
