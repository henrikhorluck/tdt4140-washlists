import { deleteRequest, get, patch, post } from "./index";

import fetchMock from 'fetch-mock'


it('GET request returns a successful response', async () => {

    fetchMock.mock('http://localhost:8000/', JSON.stringify({status: 200}));
    
      const res = await get<any>(
            "",
            {},
            {}
      );
      expect(res.status).toEqual(200);

      fetchMock.restore();
})

it('POST request returns a successful response', async () => {

    fetchMock.mock('http://localhost:8000/', JSON.stringify({status: 200}));
    
      const res = await post<any>(
            "",
            {},
            {}
      );
      expect(res.status).toEqual(200);

      fetchMock.restore();
})

it('DELETE request returns a successful response', async () => {

    fetchMock.mock('http://localhost:8000/', JSON.stringify({status: 200}));
    
      const res = await deleteRequest<any>(
            "",
            {},
            {}
      );
      expect(res.status).toEqual(200);

      fetchMock.restore();
})

it('PATCH request returns a successful response', async () => {

    fetchMock.mock('http://localhost:8000/', JSON.stringify({status: 200}));
    
      const res = await patch<any>(
        {
            query: "",
            data: {},
            parameters: {},
            options: {}
          }
      );
      expect(res.status).toEqual(200);

      fetchMock.restore();
})

it('GET request returns a unsuccessfull response', async () => {

    fetchMock.mock('http://localhost:8000/', 204);
    
      const res = await get<any>(
            "",
            {},
            {}
      );
      expect(res).toEqual(null);

      fetchMock.restore();
})