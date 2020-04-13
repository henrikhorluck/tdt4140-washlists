import { Query, toQueryString } from "./queryString";
import { DOMAIN } from "./defaults";
import { Token } from "client-oauth2";

export interface RequestOptions extends RequestInit {
  token?: Token;
  domain?: string;
}

export interface APIData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BaseAPIParameters {
  page_size?: number;
  page?: number;
  format?: "json" | string;
}

const performRequest = async (
  query: string,
  parameters: Query = {},
  options: RequestOptions = {}
) => {
  const queryString = toQueryString(parameters);
  const { token, domain, ...restOptions } = options;
  const url = (domain || DOMAIN) + query + queryString;

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token.accessToken}` : ""
  };
  const requestOptions = { ...restOptions, headers };
  const response = await fetch(url, requestOptions);
  if (response.status === 204) {
    return null;
  }
  return await response.json();
};

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @template T
 * @param {string} query API endpoint URL
 * @param parameters
 * @param options
 * @returns {Promise<T>} API data
 */
export const get = async <T>(
  query: string,
  parameters: Query = {},
  options: RequestOptions = {}
): Promise<T> => {
  // const request = makeRequest(query, parameters, options);
  return performRequest(query, parameters, options);
};


/**
 * @summary Simple fetch-API wrapper for HTTP POST
 * @template T
 * @param {string} query
 * @param {T} data
 * @param {object} parameters
 * @param options
 * @returns {Promise<T>}
 */
export const post = async <T>(
  query: string,
  data: T | {},
  parameters: Query = {},
  options: RequestOptions = {}
): Promise<T> => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: "POST", body, headers };
  return performRequest(query, parameters, opts);
};

export const deleteRequest = async <T>(
  query: string,
  data: T | {},
  parameters: Query = {},
  options: RequestOptions = {}
): Promise<T> => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: "DELETE", body, headers };
  return performRequest(query, parameters, opts);
};

export interface PutParams<T> {
  query: string;
  data: T;
  parameters?: Query;
  options?: RequestOptions;
}


export const patch = async <T, K = Partial<T>>(
  patchParams: PutParams<K>
): Promise<T> => {
  const { query, data, parameters = {}, options = {} } = patchParams;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: "PATCH", body, headers };
  return performRequest(query, parameters, opts);
};
