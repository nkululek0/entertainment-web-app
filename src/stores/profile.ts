import { createContext, createElement, useContext, useState } from 'react';

type Profile = {
  username: string
}
type Context = {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction< Profile >>
};

const ProfileContext = createContext<Context | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({ username: '' });

  return createElement(ProfileContext.Provider, { value: { profile, setProfile } }, children);
}

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
}