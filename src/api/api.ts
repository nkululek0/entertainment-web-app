import { type Show, type ShowResponse, type ShowDetails, ShowResponseSchema, ShowSchema, ShowDetailsSchema } from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

type ShowType = 'movie' | 'tv';

const getUrl = (path: string, page?: number, query?: string) => {
  const url = new URL(`${ BASE_URL }/${ path }`);

  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  if (page) url.searchParams.set('page', page.toString());
  if (query) url.searchParams.set('query', query);

  return url;
};

const processResponse = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();
  const validDataResult = responseData.results.filter((result: Show) => ShowSchema.safeParse(result).success);
  responseData.results = validDataResult;
  const validData = ShowResponseSchema.safeParse(responseData);

  if (validData.success) {
    return validData.data;
  }
};

const processShowDetailsResponse = async (url: string) => {
  const response = await fetch(url);
  const responseData = await response.json();
  const validData = ShowDetailsSchema.safeParse(responseData);

  if (validData.success) {
    return validData.data;
  }
}

const API = {
  getTrending: async (type: ShowType) => {
    const url = getUrl(`trending/${ type }/day`);
    const data = await processResponse(url.href);

    return data as ShowResponse;
  },
  getTopRated: async (type: ShowType, page: number = 1) => {
    const url = getUrl(`${ type }/top_rated`, page);
    const data = await processResponse(url.href);

    return data as ShowResponse;
  },
  getPopular: async (type: ShowType, page: number = 1) => {
    const url = getUrl(`${ type }/popular`, page);
    const data = await processResponse(url.href);

    return data as ShowResponse;
  },
  getSearch: async (type: ShowType, query: string, page: number = 1) => {
    const url = getUrl(`${ type }/search`, page, query);
    const data = await processResponse(url.href);

    return data as ShowResponse;
  },
  getShowDetails: async (type: ShowType, id: number) => {
    const url = getUrl(`${ type }/${ id }`);
    const data = await processShowDetailsResponse(url.href);

    return data as ShowDetails;
  }
};

export default API;