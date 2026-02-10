import { createFileRoute, useLoaderData, useSearch, Link, useNavigate } from '@tanstack/react-router';
import { useRef } from 'react';

import API from '@/api/api';
import type { Show } from '@/api/types';

import { Search } from '@/components/search';
import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

const sortContent = (a: Show, b: Show) => b.popularity - a.popularity;

type SearchCategory = 'movie' | 'tv';

type SearchPlaceHolderText = {
  [key: string]: string
  '': string
  'movie': string
  'tv': string
  'bookmark': string
};

const searchPlaceHolderText: SearchPlaceHolderText = {
  '': 'Search for movies or TV series',
  'movie': 'Search for movies',
  'tv': 'Search for TV series',
  'bookmark': 'Search for bookmarked shows'
};

export const Route = createFileRoute('/search')({
  component: RouteComponent,
  validateSearch: (search: { query: string, category?: SearchCategory, isBookmarked: boolean }) => {
    return {
      query: (search.query?.trim()) ?? '',
      category: (search.category) ?? '',
      isBookmarked: (search.isBookmarked) ?? false
    }
  },
  loaderDeps: ({ search: { query, category, isBookmarked }}) => ({ query, category, isBookmarked }),
  loader: async ({ deps: { query, category }}) => {

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

      const data = await API.getTrending(category as SearchCategory);

      return {
        searchResult: data.results
      };
    }

    if (query) {
      if (!category || category == 'home') {
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

      const data = await API.getSearch(category as SearchCategory, query, 1);

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
  const { query, category } = useSearch({ from: '/search' });
  const { searchResult } = useLoaderData({ from: '/search' }) as SearchResultData;
  const navigate = useNavigate();
  const searchRef = {
    query: useRef(query ?? ''),
    category: useRef(category ?? '')
  };

  const handleSearch = (searchInput: string) => {
    searchRef.query.current = searchInput;
    navigate({
      from: '/search',
      search: {
        query: searchRef.query.current,
        category: searchRef.category.current,
        isBookmarked: searchRef.category.current == 'bookmark'
      }
    });
  };

  return (
    <>
      <Link
        to='/search'
        search={{
          query: searchRef.query.current,
          category: searchRef.category.current,
          isBookmarked: searchRef.category.current == 'bookmark'
        }}
      >
        <Search
          search={ searchRef.query.current }
          onSearch={ handleSearch }
          placeHolderText={ searchPlaceHolderText[searchRef.category.current] }
        />
      </Link>
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
                <Link
                  key={ index }
                  to='/show-details/$type/$id'
                  params={{ type: item.title ? 'movie' : 'tv', id: item.id.toString() }}
                  children={
                    <Card
                      id={ item.id }
                      type='secondary'
                      title={ item.title }
                      name={ item.name }
                      release_date={ item.release_date }
                      first_air_date={ item.first_air_date }
                      poster_path={ item.poster_path }
                      vote_average={ item.vote_average }
                    />
                  }
                />
              );
            })
          }
        </section>
      </section>
    </>
  );
};