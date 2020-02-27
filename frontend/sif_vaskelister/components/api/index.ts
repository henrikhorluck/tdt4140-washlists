import { Query, toQueryString } from './queryString';
import { DOMAIN } from './defaults';
import { Token } from 'client-oauth2';



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
  format?: 'json' | string;
}

const performRequest = async (query: string, parameters: Query = {}, options: RequestOptions = {}) => {
  const queryString = toQueryString(parameters);
  const { token, domain, ...restOptions } = options;
  const url = (domain || DOMAIN) + query + queryString;

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token.accessToken}` : '',
  };
  const requestOptions = { ...restOptions, headers };
  const response = await fetch(url, requestOptions);
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();

  return data;
};

/**
 * @summary Simple fetch-API wrapper for HTTP GET
 * @param {string} query API endpoint URL
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
 * @summary Returns all pages of results from a standard REST API endpoint.
 * @param query The API endpoint to fetch results from.
 * @param page An optional page to start fetching data on.
 */
export async function getAllPages<T>(
  query: string,
  parameters: BaseAPIParameters = {},
  options: RequestOptions = {}
): Promise<T[]> {
  const { page = 1, page_size = 80 } = parameters;
  /** Get the amount of objects to get in total by fetching a single object */
  const { count }: APIData<T> = await get<APIData<T>>(query, { ...parameters, page, page_size: 1 }, options);
  /** Prepare an array with an index for each page which will be fetched */
  const pageNumber = Math.ceil(count / page_size);
  const requestCount = [...Array(pageNumber)];
  /** Initialize the fetches for all the pages at the same time */
  const requests = requestCount.map((_, i) =>
    get<APIData<T>>(query, { ...parameters, page: i + 1, page_size }, options)
  );
  /** Await all the fetches to a single array */
  const data: Array<APIData<T>> = await Promise.all(requests);
  /** Reduce all results to a single array for all objects in the resource */
  const results = data.reduce<T[]>((res, d) => res.concat(d.results), []);
  return results;
}

/**
 * @summary Simple fetch-API wrapper for HTTP POST
 * @param {string} query
 * @param {any} data
 * @param {object} parameters
 * @returns {Promise<any>}
 */
export const post = async <T>(
  query: string,
  data: T | {},
  parameters: Query = {},
  options: RequestOptions = {}
): Promise<T> => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'POST', body, headers };
  return performRequest(query, parameters, opts);
};

export interface IPutParams<T> {
  query: string;
  data: T;
  parameters?: Query;
  options?: RequestOptions;
}

export const put = async <T, K = Partial<T>>(putParams: IPutParams<K>): Promise<T> => {
  const { query, data, parameters = {}, options = {} } = putParams;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'PUT', body, headers };
  return performRequest(query, parameters, opts);
};

export const patch = async <T, K = Partial<T>>(patchParams: IPutParams<K>): Promise<T> => {
  const { query, data, parameters = {}, options = {} } = patchParams;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify(data);
  const opts = { ...options, method: 'PATCH', body, headers };
  return performRequest(query, parameters, opts);
};
