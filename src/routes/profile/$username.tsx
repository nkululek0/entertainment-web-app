
import { useState, useRef } from 'react';
import { createFileRoute, useLoaderData, useNavigate, useParams } from '@tanstack/react-router'

import { toast } from 'react-toastify';
import { logout, getUserProfile, updateUserProfile } from '@/lib/supabase-client';

import { useProfile } from '@/stores/profile';
import { LoadSpinner } from '@/components/load-spinner';

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { error, data } = await getUserProfile(params.username || '');

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('User profile not found');
    }

    return {
      firstName: data.first_name,
      lastName: data.last_name,
      image: data.avatar
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
  const [isUserProfileUpdateLoading, setIsUserProfileUpdateLoading] = useState(false);
  const profileInputs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null)
  };
  const { setIsLoggedIn } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsSignOutLoading(true);

    const { error } = await logout();

    setIsSignOutLoading(false);

    if (error) {
      toast.error('Error logging out: ' + error.message);
      return;
    }

    setIsLoggedIn(false);
    toast.info('You have been Logged out');
    navigate({ to: '/', search: { page: 1 } });
  };

  const handleUserProfileUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUserProfileUpdateLoading(true);

    const { errors: generalDetailsErrors, data: generalDetailsData } = await updateUserProfile('General', username, {
      first_name: profileInputs.firstName.current?.value ?? '',
      last_name: profileInputs.lastName.current?.value ?? '',
    });

    if (generalDetailsErrors.length > 0) {
      generalDetailsErrors.forEach((error) => {
        toast.error('Error updating user profile: ' + error);
        setIsUserProfileUpdateLoading(false);
      });
      return;
    }
    else if (generalDetailsData) {
      toast.success(generalDetailsData.message);
    }

    if (profileInputs.password.current?.value !== profileInputs.confirmPassword.current?.value) {
      toast.error('Error updating user profile: Passwords do not match');
      setIsUserProfileUpdateLoading(false);
      return;
    }

    const { errors: credentialErrors, data: credentialData } = await updateUserProfile('Credentials', username, {
      password: profileInputs.password.current?.value ?? ''
    });

    if (credentialErrors.length > 0) {
      credentialErrors.forEach((error) => {
        toast.error('Error updating user profile: ' + error);
        setIsUserProfileUpdateLoading(false);
      });
      return;
    }
    else if (credentialData) {
      toast.success(credentialData.message);
    }

    setIsUserProfileUpdateLoading(false);
    navigate({
      from: '/profile/$username',
      params: { username: username }
    });
  };

  return (
    <>
      <section className='profile-details-wrapper'>
        <section className='details-summary'>
          <div className='profile'>
            {
              image && <img src={ image } alt='' className='profile-image' />
            }
            {
              !image &&
              <div className='profile-image'>
                <h3>{ username.charAt(0).toUpperCase() }</h3>
              </div>
            }
            <div className='profile-details'>
              <div className='fullname'>
                <h3>{ firstName } { lastName }</h3>
              </div>
              <p className='username'>{ username }</p>
            </div>
          </div>
          <button className='logout-button' onClick={ handleLogout }>
            { isSignOutLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Logout' }
          </button>
        </section>
        <form className='details' onSubmit={ handleUserProfileUpdate }>
          <div className='fullname-wrapper'>
            <p className='heading'>Full Name</p>
            <div className='inputs-container'>
              <input
                ref={ profileInputs.firstName }
                type='text'
                className='input'
                placeholder='First Name'
                defaultValue=''
              />
              <input
                ref={ profileInputs.lastName }
                type='text'
                className='input'
                placeholder='Last Name'
                defaultValue=''
              />
            </div>
          </div>
          <div className='password-wrapper'>
            <p className='heading'>Password</p>
            <div className='inputs-container'>
              <input
                ref={ profileInputs.password }
                type='password'
                className='input'
                placeholder='Password'
              />
              <input
                ref={ profileInputs.confirmPassword }
                type='password'
                className='input'
                placeholder='Confirm Password'
              />
            </div>
          </div>
          <div className='actions-wrapper'>
            <button type='submit'>
              { isUserProfileUpdateLoading ? <LoadSpinner width={ 16 } height={ 16 } /> : 'Update' }
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
