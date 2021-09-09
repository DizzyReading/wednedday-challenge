import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getItunes } from '../iTunesApi';

describe('getItunesApi tests', () => {
  const artistName = 'keane';
  it('should make the api call to `/search?term=${searchTerm}`', async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getItunes(artistName);
    expect(res.data).toEqual(data);
  });
});
