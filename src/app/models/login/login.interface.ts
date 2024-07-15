export interface CreatePasswordPayload {
  title: string;
  username: string;
  password: string;
  totp?: string;
  url?: string;
  notes?: string;
  logo?: string;
  favorite?: boolean;
}

export interface Login {
  id: number;
  title: string;
  username: string;
  password: string;
  totp?: string;
  url?: string;
  notes?: string;
  logo?: string;
  favorite?: boolean;
  created: string | Date;
  updated: string | Date;
}
