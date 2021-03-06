import { Token } from "client-oauth2";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_student: boolean;
  is_manager: boolean;
  is_superuser: boolean;
  dormroom: number;
  groups: number[];
  manager_villages: number[];
}

export class AuthUser extends Token {
  user?: User;
}
