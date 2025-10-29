import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className='page-wrapper'>
      <h2>TV Series</h2>
    </section>
  );
}
