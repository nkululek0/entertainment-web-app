
import { useState } from 'react';
import { createFileRoute, useLoaderData, useNavigate, useParams } from '@tanstack/react-router'

import { toast } from 'react-toastify';
import { logout } from '@/lib/supabase-client';

import { useProfile } from '@/stores/profile';
import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    return {
      firstName: 'Nkululeko',
      lastName: 'Zikode',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
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
        <h2>There was an issue loading the profile details data :(</h2>
      </div>
    );
  }
});

function RouteComponent() {
  const { username } = useParams({ from: '/profile/$username' });
  const { firstName, lastName, image } = useLoaderData({ from: '/profile/$username' });
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);
  const { setIsLoggedIn } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsSignOutLoading(true);

    const { error } = await logout();

    setIsSignOutLoading(false);

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
      <section className='profile-details-wrapper'>
        <section className='details-summary'>
          <div className='profile'>
            <img src={ image } alt='' className='profile-image' />
            <div className='profile-details'>
              <div className='fullname'>
                <h3>{ firstName } { lastName }</h3>
              </div>
              <p className='username'>{ username }</p>
            </div>
          </div>
          <button className="logout-button" onClick={ handleLogout }>
            { isSignOutLoading ? <LoadSpinner /> : 'Logout' }
          </button>
        </section>
        <form className="details">
          <div className="fullname-wrapper">
            <p className="heading">Full Name</p>
            <div className="inputs-container">
              <input type="text" className="input" placeholder="First Name" />
              <input type="text" className="input" placeholder="Last Name" />
            </div>
          </div>
          <div className="password-wrapper">
            <p className="heading">Password</p>
            <div className="inputs-container">
              <input type="password" className="input" placeholder="Password" />
              <input type="password" className="input" placeholder="Confirm Password" />
            </div>
          </div>
          <div className="actions-wrapper">
            <button type='submit'>Save</button>
          </div>
        </form>
      </section>
    </>
  );
}
