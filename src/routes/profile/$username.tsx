import { createFileRoute, useLoaderData } from '@tanstack/react-router'

import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      username: params.username
    }
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
        <h2>There was an issue loading the profile details data :(</h2>
      </div>
    );
  }
})

function RouteComponent() {
  const { username } = useLoaderData({ from: '/profile/$username' });

  return (
    <>
      <h1>Profile: { username }</h1>
    </>
  );
}
