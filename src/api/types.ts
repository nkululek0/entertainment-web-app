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