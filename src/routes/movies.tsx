import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { Show } from '@/api/types';
import API from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/media';

export const Route = createFileRoute('/movies')({
  component: RouteComponent,
  loader: async () => {
    const result: { movies: Show[] } = { movies: [] };
    const data = await API.getPopular('movie');

    if (data && data.results.length > 0) {
      result.movies = data.results;
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
              <Card
                key={ index }
                type='secondary'
                title={ item.title }
                name={ item.name }
                release_date={ item.release_date }
                first_air_date={ item.first_air_date }
                poster_path={ item.poster_path }
                vote_average={ item.vote_average }
              />
            );
          })
        }
      </section>
    </section>
  );
}
