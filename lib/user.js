import React from 'react';
import fetch from 'isomorphic-unfetch';

// Use a global to save the user, so we don't have to fetch it again after page navigations
let userState;

const User = React.createContext({ user: null, loading: false });

//fetches the user (will want to use this with awaits in async functions)
export const fetchUser = async () => {
  if (userState !== undefined) {
    return userState;
  }

  const res = await fetch('/api/auth0/me');
  userState = res.ok ? await res.json() : null;
  return userState;
}

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  // If the user was fetched in SSR add it to userState so we don't fetch it again
  React.useEffect(() => {
    if (!userState && user) {
      userState = user
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
}

export const useUser = () => React.useContext(User);

//can use this with a state variable that can show if "loading"/"user" (ex. const {user, loading} = useFetchUser())
//this one is nice because we don't need to put it in an async function
//can dynamically update things based on if its loading, user is logged in, or user isn't logged in at all (loading, user, !loading && !user)
export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    fetchUser().then(user => {
      // Only set the user if the component is still mounted
      if (isMounted) {
        setUser({ user, loading: false });
      }
    })

    return () => {
      isMounted = false
    };
  }, [userState]);

  return data;
}