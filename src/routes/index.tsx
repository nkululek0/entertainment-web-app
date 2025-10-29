import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for movies or TV Series' />
      <section className="page-content">
        <section className='trending-wrapper'>
          <h2>Trending</h2>
          <section className="trending"></section>
        </section>
        <section className='recommended-wrapper'>
          <h2>Recommended for you</h2>
          <section className="recommended"></section>
        </section>
      </section>
    </section>
  );
};