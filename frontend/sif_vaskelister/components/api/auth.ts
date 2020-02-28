import ClientOAuth2, { Token } from 'client-oauth2';
import { get } from '.';

export class AuthUser extends Token {
    user?: User;
}

export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    dormroom: Number[];
}

const vaskelisteAuth = new ClientOAuth2({
    clientId: "5vxBY69qWoghGHfV3MVHw5JaElgAhJvTHR2iP7VF",
    clientSecret:
      "vVF9zuq4vhLBPgLfNKD1nMQEVGJkKnIRZMUz89Mi9w2VZ3M4GqOdg2lus1hpTwDJL7J1XpbMd7TbNCKgxxLx4BwTY8ZkG5UHvB3IWu4X7hWQTsM1kvkOvwJRnSG0O1HG",
    accessTokenUri: "http://localhost:8000/o/token/",
    scopes: ["read", "write"]
  });

export const login = async (username: string, password: string) => {
    const token: AuthUser = await vaskelisteAuth.owner.getToken(username, password);
    console.log(token);
    const VaskeUser = await get<User>("/api/users/9", {}, { "token": token })
    token.user = VaskeUser;
    // Returns object with both user-data and accessTokens    
    return token;
}