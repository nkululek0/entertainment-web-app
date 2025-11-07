import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { MediaItem } from '@/api/types';
import { getData } from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Media } from '@/components/media';

export const Route = createFileRoute('/movies')({
  component: RouteComponent,
  loader: async () => {
    let movies: MediaItem[] = [];
    const data = await getData();

    if (data && data.length > 0) {
      movies = data.filter((item: MediaItem) => item.category === 'Movie');
    }
    else {
      throw Error();
    }

    return { movies };
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
        <h2>There was an issue loading the movies data :(</h2>
      </div>
    );
  }
})

function RouteComponent() {
  const { movies } = useLoaderData({ from: '/movies' });

  return (
    <section className='movies-wrapper'>
      <h2>Movies</h2>
      <section className="movies">
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
  );
}
