import { createFileRoute, useSearch, useLoaderData } from '@tanstack/react-router';

import { getData } from '@/api/api';
import type { MediaItem } from '@/api/types';

import { LoadSpinner } from '@/components/load-spinner';
import { Media } from '@/components/media';

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: (search: { query: string, category: string, isBookmarked: boolean }) => {
    return {
      query: (search.query) || '',
      category: (search.category) || '',
      isBookmarked: (search.isBookmarked) || false
    }
  },
  loaderDeps: ({ search: { query, category, isBookmarked }}) => ({ query, category, isBookmarked }),
  loader: async ({ deps: { query, category, isBookmarked }}) => {
    let searchResult: MediaItem[] = [];
    const data = await getData();

    if (data && data.length > 0) {
      searchResult = data;
    }
    else {
      throw Error();
    }

    if (query) {
      searchResult = data.filter((item: MediaItem) => item.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (category) {
      searchResult = searchResult.filter((item: MediaItem) => item.category === category);
    }

    if (isBookmarked) {
      searchResult = searchResult.filter((item: MediaItem) => item.isBookmarked);
    }

    return { searchResult };
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
        <h2>There was an issue loading the search results :(</h2>
      </div>
    );
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
