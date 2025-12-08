import {
  type Show, type ShowResponse, type ShowDetails, type ShowCast, type ShowImages, type ShowVideo,
  ShowResponseSchema, ShowSchema, ShowDetailsSchema, ShowCastSchema, ShowImagesSchema, ShowVideoSchema
} from './types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

type ShowType = 'movie' | 'tv';

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

    return data as ShowCast;
  },
  getShowImages: async (type: ShowType, id: number) => {
    const url = getUrl(`${ type }/${ id }/images`);
    const data = await processResponse(url.href, 'showImages');

    return data as ShowImages;
  },
  getShowVideos: async (type: ShowType, id: number) => {
    const url = getUrl(`${ type }/${ id }/videos`);
    const data = await processResponse(url.href, 'showVideos');

    return data as ShowVideo;
  }
};

const getUrl = (path: string, page?: number, query?: string) => {
  const url = new URL(`${ BASE_URL }/${ path }`);

  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'en-US');

  if (query) url.searchParams.set('query', query);
  if (page) url.searchParams.set('page', page.toString());

  return url;
};

type ProcessResponseType = 'show' | 'showDetails' | 'showCast' | 'showImages' | 'showVideos';

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
      const showCastData = ShowCastSchema.safeParse(responseData);

      if (showCastData.success) {
        return showCastData.data;
      }

      break;
    case 'showImages':
      const showImagesData = ShowImagesSchema.safeParse(responseData);

      if (showImagesData.success) {
        return showImagesData.data;
      }

      break;
    case 'showVideos':
      const showVideosData = ShowVideoSchema.safeParse(responseData);

      if (showVideosData.success) {
        return showVideosData.data;
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

export default API;