import { z } from 'zod';

export const ShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.union([z.string(), z.null()]),
  first_air_date: z.string().optional(), //(yyy-mm-dd) ~ tv series
  genre_ids: z.array(z.number()),
  id: z.number(),
  media_type: z.union([z.literal('movie'), z.literal('tv')]).optional(),
  name: z.string().optional(), // ~ tv series
  origin_country: z.array(z.string()).optional(), // ~ tv series
  original_language: z.string(),
  original_name: z.string().optional(), // ~ tv series
  original_title: z.string().optional(), // ~ movie
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string().optional(), //(yyyy-mm-dd) ~ movie
  title: z.string().optional(), // ~ movie
  video: z.boolean().optional(), // ~ movie
  vote_average: z.number(),
  vote_count: z.number(),
});

export const ShowResponseSchema = z.object({
  page: z.number(),
  results: z.array(ShowSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type Show = z.infer<typeof ShowSchema>;
export type ShowResponse = z.infer<typeof ShowResponseSchema>;

export const ShowDetailsSchema = z.object({
  backdrop_path: z.union([z.string(), z.null()]),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  id: z.number(),
  imdb_id: z.string().optional(),
  original_language: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  release_date: z.string().optional(), // (yyyy-mm-dd) ~ movie
  first_air_date: z.string().optional(), // (yyy-mm-dd) ~ tv series
  status: z.string(),
  tagline: z.string(),
  title: z.string().optional(), // ~ movie
  name: z.string().optional(), // ~ tv series
  video: z.boolean().optional(), // ~ movie
  vote_average: z.number()
});

export type ShowDetails = z.infer<typeof ShowDetailsSchema>;

export const ShowCastSchema = z.object({
  id: z.number(),
  cast: z.array(z.object({
    gender: z.number(),
    id: z.number(),
    name: z.string(),
    profile_path: z.string().nullable(),
    character: z.string(),
    order: z.number()
  }))
});

export type ShowCast = z.infer<typeof ShowCastSchema>;

export const ShowImagesSchema = z.object({
  backdrops: z.array(z.object({
    file_path: z.string(),
    vote_average: z.number()
  })),
  posters: z.array(z.object({
    file_path: z.string(),
    vote_average: z.number()
  }))
});

export type ShowImages = z.infer<typeof ShowImagesSchema>;

export const ShowVideoSchema = z.object({
  results: z.array(z.object({
    key: z.string(),
    id: z.string(),
    site: z.string()
  }))
});

export type ShowVideo = z.infer<typeof ShowVideoSchema>;