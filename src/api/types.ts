import { z } from 'zod';

export const ShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
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

export type Show = z.infer<typeof ShowSchema>;

export const ShowResponseSchema = z.object({
  page: z.number(),
  results: ShowSchema.array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export type ShowResponse = z.infer<typeof ShowResponseSchema>;