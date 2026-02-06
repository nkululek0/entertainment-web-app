import { Link } from '@tanstack/react-router';

import { useProfile } from '@/stores/profile';

import style from './Profile.module.css';
import Avatar from '@/assets/user-profile-account.png';

type Profile = {
  username: string
};

export function Profile() {
  const { profile, isLoggedIn } = useProfile();

  return (
    <>
      {
        isLoggedIn && profile.username &&
          <Link
            to='/profile/$username'
            params={{ username: profile.username }}
            className={ style['profile-image-container'] }
          >
            {
              profile.avatar &&
                <img
                  src={ profile.avatar }
                  alt='profile image'
                  className={ style['profile-image'] }
                />
            }
            {
              !profile.avatar &&
                <div className={ `${ style['profile-image'] } ${ style['signed-in'] }` }>
                  <p>{ profile.username.charAt(0).toUpperCase() }</p>
                </div>
            }
          </Link>
      }
      {
        !isLoggedIn && !profile.username &&
          <Link to='/authentication' className={ style['profile-image-container'] }>
            <img
              src={ Avatar }
              alt='profile image'
              className={ style['profile-image'] }
            />
          </Link>
      }
    </>
  );
};