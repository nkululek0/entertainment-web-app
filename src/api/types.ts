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
  backdrop_path: z.string(),
  genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  release_date: z.string().optional(), // (yyyy-mm-dd) ~ movie
  first_air_date: z.string().optional(), // (yyy-mm-dd) ~ tv series
  status: z.string(),
  tagline: z.string(),
  title: z.string(), // ~ movie
  name: z.string().optional(), // ~ tv series
  video: z.boolean(),
  vote_average: z.number()
});

export type ShowDetails = z.infer<typeof ShowDetailsSchema>;