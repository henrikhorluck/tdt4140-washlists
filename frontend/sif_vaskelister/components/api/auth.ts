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
    dormrooms: number[];
}

const vaskelisteAuth = new ClientOAuth2({
    clientId: "a2h2gfMosEXdW0JU9StGow0alae3DCgM8pd4zqDs",
    clientSecret:
      "76hDVmHyWfaCfgcBE4pYIMRLkfC7THWdLJkGRIuNSKO4jgPqBWCgcMYE8exuD5ClhUcGzT1C7ELuFyxAnmOsLnhBlKbxd2jwrjpGcS1xI72mU0JXXWHTYpLx88VVuUBw",
    accessTokenUri: "http://localhost:8000/o/token/",
    scopes: ["read", "write"]
  });

export const login = async (username: string, password: string) => {
    const token: AuthUser = await vaskelisteAuth.owner.getToken(username, password);
    const VaskeUser = await get<User>("/api/users/1/", {}, { "token": token })
    token.user = VaskeUser;
    // Returns object with both user-data and accessTokens    
    return token;
}