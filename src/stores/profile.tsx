import { createContext, useContext, useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { getSession, getUserProfile } from '@/lib/supabase-client.ts';
import { LoadSpinner } from '@/components/load-spinner';


type Profile = {
  username: string
  avatar: string
}
type Context = {
  profile: Profile
  setIsLoggedIn: React.Dispatch<React.SetStateAction< boolean >>
  isLoggedIn: boolean
};

const ProfileContext = createContext<Context | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile>({ username: '', avatar: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const retrieveSession = async () => {
      const { error, data } = await getSession();
      setIsLoading(false);

      if (error) toast.error(`Error while getting session: ${ error.message }`)

      if (data.session) {
        const { data: userProfileData } = await getUserProfile(data.session.user?.email || '');
        const user = userProfileData;

        setProfile({ username: user.username as string, avatar: user.avatar as string });
        setIsLoggedIn(true);
      }
      else {
        setProfile({ username: '', avatar: '' });
        setIsLoggedIn(false);
      }
    };

    retrieveSession();
  }, [isLoggedIn]);

  return (
    <ProfileContext.Provider value={{ profile, setIsLoggedIn, isLoggedIn }}>
      { isLoading &&
        <div style={{ margin: '0% 50%' }}>
          <LoadSpinner width={ 60 } height={ 60 } />
        </div>
      }
      { !isLoading && children }
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
};