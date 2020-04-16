export type QueryTypes = string | number | null | undefined;

export interface Query {
  [index: string]: QueryTypes | QueryTypes[];
}

/**
 * TODO: Add validation
 * @param {object} queryObject e.g. {foo: 'bar', hello: 'world'}
 * @return {string} e.g. ?foo=bar&hello=world
 */
export const toQueryString = (queryObject: Query): string => {
  const keys = Object.keys(queryObject);
  if (!keys.length) {
    return "";
  }
  const queries = keys
    .filter(key => queryObject[key] !== undefined)
    .map((key: string) => `${key}=${queryObject[key]}`);
  return `?${queries.join("&")}`;
};

