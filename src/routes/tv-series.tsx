import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';

import API from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

import type { PageNavigationSymbols } from '@/components/pagination/Pagination.types';
import { Pagination, handlePageChange } from '@/components/pagination';

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
  validateSearch: (search: { page: number }) => {
    return {
      page: Math.min(search.page ?? 1, 500)
    }
  },
  loaderDeps: ({ search: { page }}) => ({ page }),
  loader: async ({ deps: { page }}) => {
    const data = await API.getPopular('tv', page);

    if (!data) throw Error();

    return {
      tvSeries: data.results,
      page: page
    };
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
  const { tvSeries, page } = useLoaderData({ from: '/tv-series' });
  const totalPages = 500;
  const navigate = useNavigate({ from: '/tv-series' });

  const navigateTo = (pageSymbol: PageNavigationSymbols) => {
    handlePageChange(navigate, pageSymbol, page, totalPages);
  };

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
      <Pagination
        totalPages={ totalPages }
        page={ page }
        siblings={ 1 }
        onPageChange={ navigateTo }
      />
    </section>
  );
}
