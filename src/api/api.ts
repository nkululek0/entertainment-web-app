import { type Show, type ShowResponse, type ShowDetails, ShowResponseSchema, ShowSchema, ShowDetailsSchema } from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

type ShowType = 'movie' | 'tv';

type ProcessResponseType = 'show' | 'showDetails' | 'showCast';

const API = {
  getTrending: async (type: ShowType) => {
    const url = getUrl(`trending/${ type }/day`);
    const data = await processResponse(url.href, 'show');

    return data as ShowResponse;
  },
  getTopRated: async (type: ShowType, page: number = 1) => {
    const url = getUrl(`${ type }/top_rated`, page);
    const data = await processResponse(url.href, 'show');

    return data as ShowResponse;
  },
  getPopular: async (type: ShowType, page: number = 1) => {
    const url = getUrl(`${ type }/popular`, page);
    const data = await processResponse(url.href, 'show');

    return data as ShowResponse;
  },
  getSearch: async (type: ShowType, query: string, page: number = 1) => {
    const url = getUrl(`search/${ type }`, page, query);
    const data = await processResponse(url.href, 'show');

    return data as ShowResponse;
  },
  getShowDetails: async (type: ShowType, id: number) => {
    const url = getUrl(`${ type }/${ id }`);
    const data = await processResponse(url.href, 'showDetails');

    return data as ShowDetails;
  },
  getShowCast: async (type: ShowType, id: number) => {
    const url = getUrl(`${ type }/${ id }/credits`);
    const data = await processResponse(url.href, 'showCast');

    return data as ShowResponse;
  }
};

export default API;

const getUrl = (path: string, page?: number, query?: string) => {
  const url = new URL(`${ BASE_URL }/${ path }`);

  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  if (query) url.searchParams.set('query', query);
  if (page) url.searchParams.set('page', page.toString());

  return url;
};

const processResponse = async (url: string, processType: ProcessResponseType) => {
  const response = await fetch(url);
  const responseData = await response.json();

  switch (processType) {
    case 'showDetails':
      const showDetailsData = ShowDetailsSchema.safeParse(responseData);

      if (showDetailsData.success) {
        return showDetailsData.data;
      }

      break;
    case 'showCast':
      const showCastData = ShowResponseSchema.safeParse(responseData);

      if (showCastData.success) {
        return showCastData.data;
      }

      break;
    default:
      const showData = responseData.results.filter((result: Show) => ShowSchema.safeParse(result).success);
      responseData.results = showData;
      const showResponseData = ShowResponseSchema.safeParse(responseData);

      if (showResponseData.success) {
        return showResponseData.data;
      }

      break;
  }
};