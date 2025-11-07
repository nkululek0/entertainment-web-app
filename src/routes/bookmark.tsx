import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { MediaItem } from '@/api/types';
import { getData } from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Media } from '@/components/media';

export const Route = createFileRoute('/bookmark')({
  component: RouteComponent,
  loader: async () => {
    const result: { movies: MediaItem[], tvSeries: MediaItem[] } = { movies: [], tvSeries: [] };
    const data = await getData();

    if (data && data.length > 0) {
      result.movies = data.filter((item: MediaItem) => item.category === 'Movie' && item.isBookmarked === true);
      result.tvSeries = data.filter((item: MediaItem) => item.category === 'TV Series' && item.isBookmarked === true);
    }
    else {
      throw Error();
    }

    return result;
  },
  pendingComponent: () => {
    return (
      <div className='loading'>
        <LoadSpinner width={ 82 } height={ 82 } />
      </div>
    );
  },
  errorComponent: () => {
    return (
      <div className='error'>
        <h2>There was an issue loading the bookmark data :(</h2>
      </div>
    );
  }
});

function RouteComponent() {
  const { movies, tvSeries } = useLoaderData({ from: '/bookmark' });

  return (
    <section className='bookmarks-wrapper'>
      <section className='bookmarked-movies-wrapper'>
        <h2>Bookmarked Movies</h2>
        <section className='bookmarks'>
          {
            movies?.map((item, index) => {
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
      <section className='bookmarked-tv-series-wrapper'>
        <h2>Bookmarked TV Series</h2>
        <section className='bookmarks'>
          {
            tvSeries?.map((item, index) => {
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
  );
};