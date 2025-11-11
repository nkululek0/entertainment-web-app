import { MediaItemSchema } from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getData() {
  const response = await fetch('/data.json');
  const data = await response.json();
  const validData = MediaItemSchema.array().safeParse(data);

  if (validData.success) {
    return validData.data;
  }
};

export const movies = {
  getTrending: async () => {
    const response = await fetch(`${ BASE_URL }/trending/movie/day?api_key=${ API_KEY }&language=en-US`);
    const responseData = await response.json();

    return responseData.results;
  },
  getTopRated: async (page: number = 1) => {
    const response = await fetch(`${ BASE_URL }/movie/top_rated?api_key=${ API_KEY }&language=en-US&page=${ page }`);
    const responseData = await response.json();

    return responseData;
  },
  getPopular: async (page: number = 1) => {
    const response = await fetch(`${ BASE_URL }/movie/popular?api_key=${ API_KEY }&language=en-US&page=${ page }`);
    const responseData = await response.json();

    return responseData;
  }
};

export const tvSeries = {
  getTrending: async () => {
    const response = await fetch(`${ BASE_URL }/trending/tv/day?api_key=${ API_KEY }&language=en-US`);
    const responseData = await response.json();

    return responseData.results;
  },
  getTopRated: async (page: number = 1) => {
    const response = await fetch(`${ BASE_URL }/tv/top_rated?api_key=${ API_KEY }&language=en-US&page=${ page }`);
    const responseData = await response.json();

    return responseData;
  }
};