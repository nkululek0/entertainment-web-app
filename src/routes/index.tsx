import { useRef } from 'react';
import type { RefObject } from 'react';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useDraggable } from 'react-use-draggable-scroll';

import type { Show } from '@/api/types';
import { movies, tvSeries } from '@/api/api';

import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/media';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    const result: { trendingMedia: Show[], recommended: Show[] } = {
      trendingMedia: [],
      recommended: []
    };

    const [
      trendingMovies,
      trendingTvSeries,
      topRatedMovies,
      topRatedSeries
    ] = await Promise.all([
      movies.getTrending(),
      tvSeries.getTrending(),
      movies.getTopRated(),
      tvSeries.getTopRated()
    ]);

    const trending = [...trendingMovies.slice(0, 5), ...trendingTvSeries.slice(0, 5)];
    trending.sort((a: Show, b: Show) => b.popularity - a.popularity);

    const recommended = [...topRatedMovies.results, ...topRatedSeries.results];
    recommended.sort((a: Show, b: Show) => b.popularity - a.popularity);

    if (trending && trending.length > 0 && recommended && recommended.length > 0) {
      result.trendingMedia = trending;
      result.recommended = recommended;
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
  const { trendingMedia, recommended } = useLoaderData({ from: '/' });

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
    </section>
  );
};