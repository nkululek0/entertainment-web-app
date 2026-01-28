import { Link } from '@tanstack/react-router';

import { useProfile } from '@/stores/profile';

import style from './Profile.module.css';

type ProfileProps = {
  Avatar: string
};

type Profile = {
  username: string
};

export function Profile(props: ProfileProps) {
  const { Avatar } = props;
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
            <img
              src={ Avatar }
              alt='profile image'
              className={ style['profile-image'] }
            />
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