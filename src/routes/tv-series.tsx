import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { Show } from '@/api/types';
import API from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
  loader: async () => {
    const result: { tvSeries: Show[] } = { tvSeries: [] };
    const data = await API.getPopular('tv');

    if (data && data.results.length > 0) {
      result.tvSeries = data.results;
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
        <h2>There was an issue loading the tv series data :(</h2>
      </div>
    );
  }
})

function RouteComponent() {
  const { tvSeries } = useLoaderData({ from: '/tv-series' });

  return (
    <section className='tv-series-wrapper'>
      <h2>TV Series</h2>
      <section className="tv-series">
        {
          tvSeries?.map((item, index) => {
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
