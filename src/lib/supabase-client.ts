
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

import { type Profile, ProfileSchema } from '@/api/types';

const databaseNames = {
  user_profiles: 'user_profiles'
};

export const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${ getURL() }authentication`
    }
  });

  return { error };
};

export const login = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return { error };

  data as unknown as Profile;
  const profileData = ProfileSchema.safeParse(data);

  if (profileData.success) {
    return { data: profileData.data };
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  return { error };
};

export const setUserProfile = async (username: string) => {
  const { error } = await supabase
  .from(databaseNames.user_profiles)
  .insert({ username: username })
  .single();

  return { error };
};

export const getUserProfile = async (username: string) => {
  const { data, error } = await supabase
  .from(databaseNames.user_profiles)
  .select('*')
  .eq('username', username)
  .single();

  return { data, error };
};

type UserProfile = {
  [key: string]: string
  first_name: string
  last_name: string
};

type UserCredentials = {
  [key: string]: string
  password: string
  email: string
};

type ProfileUpdateType = 'General' | 'Credentials';

export const updateUserProfile = async (type: ProfileUpdateType, username: string, options: Partial<UserProfile> | Partial<UserCredentials>) => {
  const promises = [];

  if (type === 'General') {
    for (const key in options) {
      if (options[key]) {
        promises.push(setUserProfileGeneralDetails(username, key, options[key]));
      }
    }
  }
  else if (type === 'Credentials') {
    for (const key in options) {
      if (options[key]) {
        promises.push(setUserProfileCredentials(key, options[key]));
      }
    }
  }

  const response = await Promise.all(promises.map(p => p()));
  const errors = response.filter((r) => r.error).map((r) => r.error?.message);

  return { errors, data: promises.length > 0 ? { message: 'User profile updated successfully' } : null };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  return { data, error };
};

const setUserProfileGeneralDetails = (username: string, key: string, value: string) => {
  return async () => {
    const { error } = await supabase
    .from(databaseNames.user_profiles)
    .update({ [key]: value })
    .match({ username: username });

    return { error };
  };
};

const setUserProfileCredentials = (key: string, value: string) => {
  return async () => {
    const { error } = await supabase.auth.updateUser({
      [key]: value
    });

    return { error };
  };
};

const getURL = () => {
  let url =
    import.meta.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    import.meta.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:5173/';
  // Make sure to include `https://` when not localhost.
  url = url.startsWith('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
};

export default supabase;