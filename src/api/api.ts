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
  getPopular: async () => {
    const response = await fetch(`${ BASE_URL }/trending/movie/day?api_key=${ API_KEY }&language=en-US`);
    const responseData = await response.json();

    return responseData.results;
  }
};

export const tvSeries = {
  getPopular: async () => {
    const response = await fetch(`${ BASE_URL }/trending/tv/day?api_key=${ API_KEY }&language=en-US`);
    const responseData = await response.json();

    return responseData.results;
  }
};