import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import { LoadSpinner } from '@/components/load-spinner';
import { CardDetails } from '@/components/card-details';

export const Route = createFileRoute('/show-details/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      id: params.id,
    };
  },
  pendingComponent: () => {
      return (
        <div className='loading'>
          <LoadSpinner width={ 82 } height={ 82 } />
        </div>
      );
    },
    errorComponent: () => {
      return (
        <div className='error'>
          <h2>There was an issue loading the show details data :(</h2>
        </div>
      );
    }
});

function RouteComponent() {
  const { id } = useLoaderData({ from: '/show-details/$id' });

  return (
    <section className='show-details-wrapper'>
      <h2>Show Details page show id: { id }</h2>
      <CardDetails />
    </section>
  );
}