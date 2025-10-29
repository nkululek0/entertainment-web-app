import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bookmark')({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for bookmarked shows' />
      <section className='bookmarks-wrapper'>
        <h2>Bookmarked Movies</h2>
        <section className="bookmarks"></section>
      </section>
    </section>
  );
};