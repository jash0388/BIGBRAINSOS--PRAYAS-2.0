import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const hasSupabase = !!(supabaseUrl && supabaseKey &&
  supabaseUrl !== 'undefined' && supabaseKey !== 'undefined' &&
  supabaseUrl.startsWith('http'));

const supabase = hasSupabase ? createClient(supabaseUrl, supabaseKey) : null;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const guestUser = { id: 'guest', email: 'guest@bigbrainsos.app', name: 'Guest' };
  const [user, setUser] = useState(hasSupabase ? null : guestUser);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(hasSupabase);

  useEffect(() => {
    if (!hasSupabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, name) => {
    if (!hasSupabase) {
      setUser({ id: 'guest', email, name });
      return { data: { user: { id: 'guest', email } }, error: null };
    }
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!hasSupabase) {
      setUser({ id: 'guest', email });
      return { data: { user: { id: 'guest', email } }, error: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    if (hasSupabase) await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
