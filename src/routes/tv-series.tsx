import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tv-series')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for TV series' />
      <section className='tv-series-wrapper'>
        <h2>TV Series</h2>
        <section className="tv-series"></section>
      </section>
    </section>
  );
}
