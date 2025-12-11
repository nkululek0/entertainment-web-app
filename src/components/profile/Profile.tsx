import { Link } from '@tanstack/react-router';

import style from './Profile.module.css';

type ProfileProps = {
  Avatar: string
};

export function Profile(props: ProfileProps) {
  const { Avatar } = props;

  return (
    <Link to='/authentication' className={ style['profile-image-container'] }>
      <img
        src={ Avatar }
        alt='profile image'
        className={ style['profile-image'] }
      />
    </Link>
  );
};