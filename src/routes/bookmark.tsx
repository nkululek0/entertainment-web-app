import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bookmark')({
  component: RouteComponent,
});

function RouteComponent() {
return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for bookmarked shows' />
      <h2>Bookmarks</h2>
    </section>
  );
};