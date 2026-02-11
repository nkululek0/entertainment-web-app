import { createFileRoute, Link } from '@tanstack/react-router';

import type { Bookmark } from '@/api/types';

import { useProfile } from '@/stores/profile';
import { useBookmarks } from '@/stores/bookmarks';
import { LoadSpinner } from '@/components/load-spinner';
import { Card } from '@/components/card';

export const Route = createFileRoute('/bookmarks')({
  component: RouteComponent,
  loader: async () => {},
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
        <h2>There was an issue loading the bookmark data :(</h2>
      </div>
    );
  }
});

function RouteComponent() {
  const { isLoggedIn, profile } = useProfile();

  if (!isLoggedIn && !profile.username) {
    return (
      <div className='error'>
        <h2>Please login to add bookmarks</h2>
      </div>
    );
  };

  const { bookmarks } = useBookmarks();

  const movies: Bookmark[] = [];
  const tvSeries: Bookmark[] = [];

  for (const bookmark of bookmarks as Bookmark[]) {
    if (bookmark.name) {
      tvSeries.push(bookmark);
    }
    else if (bookmark.title) {
      movies.push(bookmark);
    }
  }

  return (
    <>
    {
      <section className='bookmarks-wrapper'>
        <section className='bookmarked-movies-wrapper'>
          <h2>Bookmarked Movies</h2>
          <section className='bookmarks'>
            {
              movies.length <= 0 &&
              <p>No movie bookmarks</p>
            }
            {
              movies.length > 0 && movies.map((item, index) => {
                return (
                  <Link
                    key={ index }
                    to='/show-details/$type/$id'
                    params={{ type: 'tv', id: item.id.toString() }}
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
        <section className='bookmarked-tv-series-wrapper'>
          <h2>Bookmarked TV Series</h2>
          <section className='bookmarks'>
            {
              tvSeries.length <= 0 &&
              <p>No movie bookmarks</p>
            }
            {
              tvSeries.length > 0 && tvSeries.map((item, index) => {
                return (
                  <Link
                    key={ index }
                    to='/show-details/$type/$id'
                    params={{ type: 'tv', id: item.id.toString() }}
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
      </section>
    }
    </>
  );
};