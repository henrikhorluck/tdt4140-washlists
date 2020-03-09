import ClientOAuth2, { Token } from "client-oauth2";
import { get } from ".";

export class AuthUser extends Token {
  user?: User;
}

export interface User {
  id: number;
  password: string;
  last_login: any;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  dormroom: {
    id: number;
    number: number;
    village: number;
  };
  groups: [
    {
      id: number;
      name: string;
      permissions: any;
    }
  ];
  user_permissions: string[];
}

const vaskelisteAuth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: "http://localhost:8000/o/token/",
  scopes: ["read", "write"]
});

export const login = async (username: string, password: string) => {
  const token: AuthUser = await vaskelisteAuth.owner.getToken(
    username,
    password
  );
  token.user = await get<User>("/api/profile/", {}, { token: token });
  // Returns object with both user-data and accessTokens
  return token;
};
