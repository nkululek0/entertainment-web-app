import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { MediaItem } from '@/api/types';
import { getData } from '@/api/api';

import { Media } from '@/components/media';

export const Route = createFileRoute('/movies')({
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
})

function RouteComponent() {
  const data = useLoaderData({ from: '/movies' });
  const movies = data?.filter((item: MediaItem) => item.category === 'Movie');

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
