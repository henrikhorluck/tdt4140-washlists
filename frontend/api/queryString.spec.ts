import { Query, toQueryString } from "./queryString";

it('returns query string', () => {
    expect(toQueryString({foo: 'bar', hello: 'world'})).toBe('?foo=bar&hello=world')
})
