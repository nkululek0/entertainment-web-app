import { createFileRoute, useLoaderData, useSearch } from '@tanstack/react-router';

import API from '@/api/api';
import type { Show } from '@/api/types';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

const sortContent = (a: Show, b: Show) => b.popularity - a.popularity;

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
  loader: async ({ deps: { query, category }}) => {
    query = query.trim();

    if (!query) {
      if (!category) {
        const [trendingMovies, trendingTvSeries] = await Promise.all([
          API.getTrending('movie'),
          API.getTrending('tv')
        ]);
        const data = [...trendingMovies.results, ...trendingTvSeries.results];

        data.sort(sortContent);

        return {
          searchResult: data
        };
      }

      const data = await API.getTrending(category === 'Movie' ? 'movie' : 'tv');

      return {
        searchResult: data.results
      };
    }

    if (query) {
      if (!category) {
        const [movieSearch, tvSearch] = await Promise.all([
          API.getSearch('movie', query, 1),
          API.getSearch('tv', query, 1)
        ]);
        const data = [...movieSearch.results, ...tvSearch.results];

        data.sort(sortContent);

        return {
          searchResult: data
        };
      }

      const data = await API.getSearch(category === 'Movie' ? 'movie' : 'tv', query, 1);

      return {
        searchResult: data.results
      };
    }

    // if (isBookmarked) {
    //   searchResult = searchResult.filter((item: MediaItem) => item.isBookmarked);
    // }
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

type SearchResultData = {
  searchResult: Show[]
};

function RouteComponent() {
  const { query } = useSearch({ from: '/search' });
  const { searchResult } = useLoaderData({ from: '/search' }) as SearchResultData;

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
          searchResult?.map((item: Show, index: number) => {
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
};
