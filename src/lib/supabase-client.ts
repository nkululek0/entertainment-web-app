
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const login = async (email: string, password: string) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { error, data };
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