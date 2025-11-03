import { Search } from '@/components/search';

import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { MediaItem } from '@/api/types';
import { getData } from '@/api/api';

import { Media } from '@/components/media';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const data = await getData();

    if (data && data.length > 0) {
      return data;
    }
    else {
      throw Error();
    }
  },
  pendingComponent: () => {
    return <div className='loading'>Loading...</div>;
  },
  errorComponent: () => {
    return <div className='error'>There was an issue loading the component data</div>;
  }
});

function RouteComponent() {
  const data = useLoaderData({ from: '/' });
  const trendingMedia = data?.filter((item: MediaItem) => item.isTrending);
  const recommended = data?.filter((item: MediaItem) => !item.isTrending);

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for movies or TV Series' />
      <section className='home-content'>
        <section className='trending-wrapper'>
          <h2>Trending</h2>
          <div className='trending-media-wrapper'>
            <section className='trending'>
              {
                trendingMedia?.map((item: MediaItem, index: number) => {
                  return (
                    <Media
                      key={ index }
                      type='primary'
                      title={ item.title }
                      year={ item.year }
                      category={ item.category }
                      rating={ item.rating }
                      isBookmarked={ item.isBookmarked }
                      isTrending={ item.isTrending }
                      thumbnail={ item.thumbnail }
                    />
                  );
                })
              }
            </section>
          </div>
        </section>
        <section className='recommended-wrapper'>
          <h2>Recommended for you</h2>
          <section className='recommended'>
            {
              recommended?.map((item: MediaItem, index: number) => {
                return (
                  <Media
                    key={ index }
                    type='secondary'
                    title={ item.title }
                    year={ item.year }
                    category={ item.category }
                    rating={ item.rating }
                    isBookmarked={ item.isBookmarked }
                    isTrending={ item.isTrending }
                    thumbnail={ item.thumbnail }
                  />
                );
              })
            }
          </section>
        </section>
      </section>
    </section>
  );
};