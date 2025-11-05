import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <section className='tv-series-wrapper'>
      <h2>TV Series</h2>
      <section className="tv-series"></section>
    </section>
  );
}
