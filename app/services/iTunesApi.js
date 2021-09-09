import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('itunes');

export const getItunes = (searchTerm) => iTunesApi.get(`/search?term=${searchTerm}`);
