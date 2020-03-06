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
  clientId: "SLDhkx2m08A3c357d4WihIWGzcUQ4duc0TeWhUGL",
  clientSecret:
    "XA1f55cdS3UVmX5bk5Rjb9kqMV4v79a2gATGcvehoXR9BAMkjlda8KA0pTiBtBa2k5LAuxGNTJmQVrp8GaCs7P2IQ146f5KIzFmNOOcNz6sgqIeEYllKyDU2RbcoeFwX",
  accessTokenUri: "http://localhost:8000/o/token/",
  scopes: ["read", "write"]
});

export const login = async (username: string, password: string) => {
  const token: AuthUser = await vaskelisteAuth.owner.getToken(
    username,
    password
  );
  token.user = await get<User>("/api/users/1/", {}, { token: token });
  // Returns object with both user-data and accessTokens
  return token;
};
