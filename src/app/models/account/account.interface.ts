import { Role } from '../../enums/role.enum.ts';

export interface User {
  id: number;
  created: Date;
  updated: Date;
  email: string;
  fullName: string;
  logo: string;
  lang: string;
  status: string;
  roles: Role[];
}
