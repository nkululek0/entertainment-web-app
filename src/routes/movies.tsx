import { Search } from '@/components/search';

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movies')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <section className='page-wrapper'>
      <Search placeHolderText='Search for movies' />
      <h2>Movies</h2>
    </section>
  );
}
