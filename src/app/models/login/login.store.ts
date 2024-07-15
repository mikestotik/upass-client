import { makeAutoObservable, runInAction } from 'mobx';
import { CreatePasswordPayload, Login } from './login.interface.ts';
import { loginService } from './login.service.ts';

export class LoginStore {
  public logins: Login[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public selectById = (id?: number) => {
    return this.logins.find((i) => i.id === id);
  };

  public async load() {
    const list = await loginService.load();
    return runInAction(() => (this.logins = list));
  }

  public async create(values: CreatePasswordPayload) {
    const item = await loginService.create(values);
    runInAction(() => (this.logins = [...this.logins, item]));
    return item;
  }

  public async update(id: number, values: Partial<CreatePasswordPayload>) {
    const item = await loginService.update(id, values);
    runInAction(
      () =>
        (this.logins = this.logins.map((i) => {
          if (i.id === id) return item;
          return i;
        })),
    );
    return item;
  }

  public async delete(id: number) {
    await loginService.delete(id);
    return runInAction(() => (this.logins = this.logins.filter((i) => i.id !== id)));
  }
}
