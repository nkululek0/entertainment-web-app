import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { type Bookmark } from '@/api/types';

import { getUserBookmarks } from '@/lib/supabase-client';
import { useProfile } from './profile';

type Context = {
  bookmarks: Bookmark[]
  updateBookmarks: () => void
};

const BookmarkContext = createContext<Context | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [hasUpdatedBookmarks, setHasUpdatedBookmarks] = useState(false);
  const { isLoggedIn, profile } = useProfile();

  useEffect(() => {
    setHasUpdatedBookmarks(false);

    if (isLoggedIn && profile.username) {
      const retrieveUserBookmarks = async () => {
        const { error, data } = await getUserBookmarks(profile.username);

        if (error) toast.error(`Error getting user bookmarks: ${ error.message }`);

        if (data) {
          const bookmarks = data.bookmarks as unknown as Bookmark[];
          setBookmarks(bookmarks);
        }
        else {
          setBookmarks([]);
        }
      };

      retrieveUserBookmarks();
    }
  }, [isLoggedIn, hasUpdatedBookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, updateBookmarks: () => setHasUpdatedBookmarks(true) }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }

  return context;
};