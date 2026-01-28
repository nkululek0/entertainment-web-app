
import { useState } from 'react';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router'

import { toast } from 'react-toastify';
import { logout } from '@/lib/supabase-client';

import { useProfile } from '@/stores/profile';
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
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    const { error } = await logout();

    setIsLoading(false);

    if (error) {
      toast.error('Error logging out: ' + error.message);
    }
    else {
      setIsLoggedIn((prev) => {
        console.log(prev)
        return false
      });
      toast.info('You have been Logged out');
      navigate({ to: '/', search: { page: 1 } });
    }
  };

  return (
    <>
      <h1>Profile: { username }</h1>
      <button onClick={ handleLogout }>
        { isLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Sign out' }
      </button>
    </>
  );
}
