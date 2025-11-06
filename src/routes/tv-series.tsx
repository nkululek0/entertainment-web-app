import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import type { MediaItem } from '@/api/types';
import { getData } from '@/api/api';

import { Media } from '@/components/media';

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
  loader: async () => {
    let tvSeries: MediaItem[] = [];
    const data = await getData();

    if (data && data.length > 0) {
      tvSeries = data.filter((item: MediaItem) => item.category === 'TV Series');
    }
    else {
      throw Error();
    }

    return { tvSeries };
  },
  pendingComponent: () => {
    return <div className='loading'>Loading...</div>;
  },
  errorComponent: () => {
    return <div className='error'>There was an issue loading the component data</div>;
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
