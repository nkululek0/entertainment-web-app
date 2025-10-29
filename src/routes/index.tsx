import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {

  return (
    <section className='page-wrapper'>
      <h2>Trending</h2>
    </section>
  );
};