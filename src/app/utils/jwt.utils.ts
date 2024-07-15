export interface JwtPayload {
  exp: number;
  sub: number;
}

export interface JwtHead {
  alg: string;
  typ: string;
}

export class JWTParser<T extends JwtPayload> {
  constructor(private readonly token: string) {}

  public getHead(): JwtHead {
    const payload = this.token?.split('.')[0];
    return JSON.parse(atob(payload));
  }

  public getPayload(): T | null {
    const payload = this.token?.split('.')[1];

    if (!payload) {
      return null;
    }
    return JSON.parse(atob(payload));
  }

  public isExpired(): boolean {
    const payload = this.getPayload();

    if (payload) {
      return Date.now() >= payload.exp * 1000;
    }
    return true;
  }
}
