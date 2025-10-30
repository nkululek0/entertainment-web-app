import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router';

import type { Trending } from '@/api/types';
import { getTrending } from '@/api/trending';

import { Media } from '@/components/media';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const trendingMedia = getTrending();

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for movies or TV Series' />
      <section className='page-content'>
        <section className='trending-wrapper'>
          <h2>Trending</h2>
          <div className='trending-media-wrapper'>
            <section className='trending'>
              {
                trendingMedia.map((item: Trending, index: number) => {
                  return (
                    <Media
                      key={ index }
                      type='primary'
                      title={ item.title }
                      year={ item.year }
                      category={ item.category }
                      rating={ item.rating }
                      isBookmarked={ item.isBookmarked }
                      thumbnail={ item.thumbnail }
                    />
                  );
                })
              }
            </section>
          </div>
        </section>
        <section className='recommended-wrapper'>
          <h2>Recommended for you</h2>
          <section className='recommended'></section>
        </section>
      </section>
    </section>
  );
};