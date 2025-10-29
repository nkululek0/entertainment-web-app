import type { Trending, Regular } from './types';

import data from '@/data.json';

export function getTrending() {
  return data.filter((item: Trending | Regular) => item.isTrending);
};