import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bookmark')({
  component: RouteComponent,
});

function RouteComponent() {
return (
    <section className='page-wrapper'>
      <h2>Bookmarks</h2>
    </section>
  );
};