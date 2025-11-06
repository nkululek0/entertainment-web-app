import { createFileRoute, useSearch, useLoaderData } from '@tanstack/react-router';

import { getData } from '@/api/api';
import type { MediaItem } from '@/api/types';

import { Media } from '@/components/media';

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: (search: { query: string, category: string}) => {
    return {
      query: (search.query) || '',
      category: (search.category) || ''
    }
  },
  loaderDeps: ({ search: { query, category }}) => ({ query, category }),
  loader: async ({ deps: { query, category }}) => {
    let searchResult: MediaItem[] = [];
    if (query) {
      const data = await getData();

      if (data && data.length > 0 ) {
        searchResult = data.filter((item: MediaItem) => item.title.toLowerCase().includes(query.toLowerCase()));

        if (category) {
          searchResult = searchResult.filter((item: MediaItem) => item.category === category);
        }
      }
      else {
        throw Error();
      }
    }

    return { searchResult };
  },
  pendingComponent: () => {
    return <div className='loading'>Loading...</div>;
  },
  errorComponent: () => {
    return <div className='error'>There was an issue loading the search results</div>;
  }
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
            : <h2>Found { searchResult.length } results for '{ query }'</h2>
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
