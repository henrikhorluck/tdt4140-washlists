import ClientOAuth2 from "client-oauth2";
import { get } from ".";
import { AuthUser, User } from "../types/user-types";

const vaskelisteAuth = new ClientOAuth2({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  accessTokenUri: `${process.env.BACKEND_DOMAIN}/o/token/`,
  scopes: ["read", "write"]
});

export const login = async (username: string, password: string) => {
  const token: AuthUser = await vaskelisteAuth.owner
    .getToken(username, password)
    .catch(err => {
      console.log("User was not logged in with error", err);
      return err;
    });
  token.user = await get<User>("/api/profile/", {}, { token: token }).catch(
    err => {
      console.log("User could not be fetched with error", err);
      return err;
    }
  );
  // Returns object with both user-data and accessTokens
  return token;
};
