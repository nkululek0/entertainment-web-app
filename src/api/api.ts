import { ShowResponseSchema } from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

type ShowType = 'movie' | 'tv';

const processResponse = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();
  const validData = ShowResponseSchema.safeParse(responseData);

  if (validData.success) {
    return validData.data;
  }
};

const API = {
  getTrending: async (type: ShowType) => {
    const data = await processResponse(`${ BASE_URL }/trending/${ type }/day?api_key=${ API_KEY }&language=en-US`);

    return data;
  },
  getTopRated: async (type: ShowType, page: number = 1) => {
    const data = await processResponse(`${ BASE_URL }/${ type }/top_rated?api_key=${ API_KEY }&language=en-US&page=${ page }`);

    return data;
  },
  async getPopular(type: ShowType, page: number = 1) {
    const data = await processResponse(`${ BASE_URL }/${ type }/popular?api_key=${ API_KEY }&language=en-US&page=${ page }`);

    return data;
  }
};

export default API;