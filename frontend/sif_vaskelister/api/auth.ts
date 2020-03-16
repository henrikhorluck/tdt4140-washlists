import ClientOAuth2, { Token } from "client-oauth2";
import { get } from ".";

export class AuthUser extends Token {
  user?: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  dormroom: number;
  groups: number[];
  manager_villages: number[];
  is_manager: boolean;
  is_student: boolean;
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
  ).catch(err => {
    console.log('User was not logged in with error', err)
    return err
  })
  token.user = await get<User>("/api/profile/", {}, { token: token })
  .catch(err => {
    console.log('User could not be fetched with error', err)
    return err
  })
  // Returns object with both user-data and accessTokens
  return token;
};
