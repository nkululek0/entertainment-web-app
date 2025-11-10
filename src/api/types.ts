import { z } from 'zod';

export const MediaItemSchema = z.object({
  title: z.string(),
  year: z.number(),
  category: z.string(),
  rating: z.string(),
  isBookmarked: z.boolean(),
  isTrending: z.boolean(),
  thumbnail: z.object({
    regular: z.object({
      small: z.string(),
      large: z.string()
    }),
    trending: z.object({
      small: z.string(),
      large: z.string()
    }).optional()
  })
});

export type MediaItem = z.infer<typeof MediaItemSchema>;

export const ShowSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  first_air_date: z.string().optional(), //(yyy-mm-dd) ~ tv series
  genre_ids: z.array(z.number()),
  id: z.number(),
  media_type: z.union([z.literal('movie'), z.literal('tv')]),
  name: z.string().optional(), // ~ tv series
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string().optional(), // ~ tv series
  original_title: z.string().optional(), // ~ movie
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  release_date: z.string().optional(), //(yyyy-mm-dd) ~ movie
  title: z.string().optional(), // ~ movie
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export type Show = z.infer<typeof ShowSchema>;