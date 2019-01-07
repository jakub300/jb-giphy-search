import { requestJson } from './utils/request';

const GIPHY_KEY = process.env.VUE_APP_GIPHY_KEY;

if (!GIPHY_KEY) {
  throw new Error('Giphy Key must be provided as env variable');
}

// eslint-disable-next-line import/prefer-default-export
export const search = params =>
  requestJson('https://api.giphy.com/v1/gifs/search', { api_key: GIPHY_KEY, ...params });
