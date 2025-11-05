import { createFileRoute, useSearch, useLoaderData } from '@tanstack/react-router';

import { getData } from '@/api/api';
import type { MediaItem } from '@/api/types';

import { Media } from '@/components/media';

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: (search: { query: string}) => {
    return {
      query: (search.query) || ''
    }
  },
  loaderDeps: ({ search: { query }}) => ({ query }),
  loader: async ({ deps: { query }}) => {
    let searchResult: MediaItem[] = [];
    const data = await getData();

    if (data && data.length > 0 && query) {
      searchResult = data.filter((item: MediaItem) => item.title.toLowerCase().includes(query.toLowerCase()));
    }

    return { searchResult };
  },
});

function RouteComponent() {
  const { query } = useSearch({ from: '/search' });
  const { searchResult } = useLoaderData({ from: '/search' });

  return (
    <section className='search-wrapper'>
      {
        !query && (
          <h2>Waiting for search...</h2>
        )
      }
      {
        query && (
          searchResult.length == 0 && <h2>No results found for '{ query }'</h2>
        )
      }
      {
        query && (
          searchResult.length > 0 && (
            searchResult.length == 1
            ? <h2>{ searchResult.length } result found for '{ query }'</h2>
            : <h2>Found { searchResult.length } results found for '{ query }'</h2>
          )
        )
      }
      <section className="search-results">
        {
          searchResult?.map((item: MediaItem, index: number) => {
            return (
              <Media
                key={ index }
                type='secondary'
                title={ item.title }
                year={ item.year }
                category={ item.category }
                rating={ item.rating }
                thumbnail={ item.thumbnail }
                isBookmarked={ item.isBookmarked }
                isTrending={ item.isTrending }
              />
            );
          })
        }
      </section>
    </section>
  );
};
