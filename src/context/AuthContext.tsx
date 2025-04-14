import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/supabase';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId) => {
    try {
      if (!userId) return null;
      
      // Try to get profile from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return null;
    }
  };

  // Update user and profile when auth state changes
  const updateUserAndProfile = async (session) => {
    const currentUser = session?.user || null;
    setUser(currentUser);
    
    if (currentUser) {
      // Get profile data from database
      const profileData = await fetchUserProfile(currentUser.id);
      
      // Combine database profile with user_metadata
      const combinedProfile = {
        id: currentUser.id,
        avatar_url: currentUser.user_metadata?.avatar_url || profileData?.avatar_url,
        full_name: currentUser.user_metadata?.full_name || profileData?.full_name,
        username: currentUser.user_metadata?.username || profileData?.username,
        website: currentUser.user_metadata?.website || profileData?.website,
        bio: profileData?.bio,
        // Include any other profile fields you need
      };
      
      setUserProfile(combinedProfile);
    } else {
      setUserProfile(null);
    }
  };

  useEffect(() => {
    // Get the current session on initial load
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        await updateUserAndProfile(data.session);
      } catch (error) {
        console.error("Error fetching session:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    // Listen for auth state changes
    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await updateUserAndProfile(session);
      }
    );

    // Cleanup the listener on unmount
    return () => {
      if (data && data.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  // Google Sign-In Function
  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
      setAuthError(error.message);
    }
  };

  // Discord Sign-In Function
  const signInWithDiscord = async () => {
    try {
      setAuthError(null);
          // Determine the correct redirect URL based on environment
    const redirectUrl = process.env.NODE_ENV === 'production' 
    ? "https://duo-keyboard-koalition.github.io" 
    : window.location.origin;
    console.log('Redirect URL:', redirectUrl);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'discord',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Discord:', error.message);
      setAuthError(error.message);
    }
  };

  const signOut = async () => {
    console.log('Initiating sign-out process...');
    try {
      setAuthError(null); // Reset the error state
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      // redirects the user to home page after sign out
      window.location.href = '/';
      if (error) {
        console.error('Supabase error during sign-out:', error.message);
        setAuthError(error.message);
        return;
      }
      console.log('User successfully signed out.');
      setUser(null); // Clear the user state manually
    } catch (error) {
      console.error('Error in signOut function:', error.message);
      setAuthError(error.message);
    }
    setLoading(false);
  };
  

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userProfile,
        loading, 
        authError, 
        signInWithGoogle, 
        signInWithDiscord, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for AuthContext
export const useAuth = () => useContext(AuthContext);