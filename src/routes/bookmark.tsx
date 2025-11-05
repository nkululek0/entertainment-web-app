import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bookmark')({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <section className='bookmarks-wrapper'>
      <h2>Bookmarked Movies</h2>
      <section className="bookmarks"></section>
    </section>
  );
};