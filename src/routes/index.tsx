import { useState, useRef } from 'react';
import type { RefObject } from 'react';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useDraggable } from 'react-use-draggable-scroll';

import type { Show } from '@/api/types';
import API from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

import type { PageNavigationSymbols } from '@/components/pagination/Pagination.types';
import { Pagination } from '@/components/pagination';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search: { page: number }) => {
    return {
      page: Number(search.page)
    }
  },
  loaderDeps: ({ search: { page }}) => ({ page }),
  loader: async ({ deps: { page }}) => {
    const result: {
      trendingMedia: Show[],
      recommended: Show[],
      page: number,
      totalPages: number
    } = {
      trendingMedia: [],
      recommended: [],
      page: page,
      totalPages: 1
    };

    const [
      trendingMovies,
      trendingTvSeries,
      topRatedMovies,
      topRatedSeries
    ] = await Promise.all([
      API.getTrending('movie'),
      API.getTrending('tv'),
      API.getTopRated('movie', page),
      API.getTopRated('tv', page)
    ]);

    if (trendingMovies && trendingTvSeries && topRatedMovies && topRatedSeries) {
      const trending = [...trendingMovies.results.slice(0, 5), ...trendingTvSeries.results.slice(0, 5)];
      trending.sort((a: Show, b: Show) => b.popularity - a.popularity);

      const recommended = [...topRatedMovies.results, ...topRatedSeries.results];
      recommended.sort((a: Show, b: Show) => b.popularity - a.popularity);

      result.trendingMedia = trending;
      result.recommended = recommended;
      result.totalPages = topRatedMovies.total_pages;
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
        <h2>There was an issue loading the data :(</h2>
      </div>
    );
  }
});

function RouteComponent() {
  const draggableRef = useRef<HTMLDivElement>(null) as RefObject<HTMLInputElement>;
  const { events } = useDraggable(draggableRef, { applyRubberBandEffect: true });
  const { trendingMedia, recommended, page, totalPages } = useLoaderData({ from: '/' });
  // const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate({ from: '/' });


  const handlePageChange = (pageSymbol: PageNavigationSymbols) => {
    if (pageSymbol == '&laquo;') {
      // setPageNumber(1);
      navigate({ search: { page: 1 } });
    }
    else if (pageSymbol == '&lsaquo;') {
      if (page != 1) {
        // setPageNumber(page - 1);
        navigate({ search: { page: page - 1 } });
      }
    }
    else if (pageSymbol == '&rsaquo;') {
      if (page != totalPages) {
        // setPageNumber(page + 1);
        navigate({ search: { page: page + 1 } });
      }
    }
    else if (pageSymbol == '&raquo;') {
      // setPageNumber(page);
      navigate({ search: { page: totalPages } });
    }
    else {
      // setPageNumber(pageSymbol);
      navigate({ search: { page: pageSymbol } });
    }
  };

  return (
    <section className='home-content'>
      <section className='trending-wrapper'>
        <h2>Trending</h2>
        <div
          className='trending-media-wrapper'
          { ...events }
          ref={ draggableRef }
        >
          <section className='trending'>
            {
              trendingMedia?.map((item: Show, index: number) => {
                return (
                  <Card
                    key={ index }
                    type='primary'
                    media_type={ item.media_type }
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
        </div>
      </section>
      <section className='recommended-wrapper'>
        <h2>Recommended for you</h2>
        <section className='recommended'>
          {
            recommended?.map((item: Show, index: number) => {
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
      <Pagination
        totalPages={ totalPages }
        page={ page }
        siblings={ 1 }
        limit={ 5 }
        onPageChange={ handlePageChange }
      />
    </section>
  );
};