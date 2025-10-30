import type { Trending, Regular } from './types';
import { getData } from './api';

export async function getTrending() {
  const data = await getData();
  const trending = data.filter((item: Trending | Regular) => item.isTrending) as Trending[];

  return trending;
};