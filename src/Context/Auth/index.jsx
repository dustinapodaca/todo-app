import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import cookie from "react-cookies";

export const AuthContext = React.createContext();

const testUsers = {
  admin: {
    username: "admin",
    password: "ADMIN",
    email: "admin@testuser.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZDFiMzNjZTQ5MDAxODlmMzhiNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIiwiZGVsZXRlIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA3OTMxLCJleHAiOjE2NTg5MTE1MzF9.bqe-52if5K50rGn30P4fheuAa2qWuxse9tWiuH4cnUM",
  },
  editor: {
    username: "editor",
    password: "EDITOR",
    email: "editor@testuser.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBlZjk5MzNjZTQ5MDAxODlmMzhiYSIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJ1cGRhdGUiLCJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4NTY5LCJleHAiOjE2NTg5MTIxNjl9.073ppQCHbplYN9befn8JElcP4zgFX6TEe_ARUQZc0KU",
  },
  user: {
    username: "user",
    password: "USER",
    email: "user@testuser.com",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZTBmMGZjMzNjZTQ5MDAxODlmMzhjMCIsImNhcGFiaWxpdGllcyI6WyJyZWFkIl0sInR5cGUiOiJ1c2VyIiwiaWF0IjoxNjU4OTA4OTI0LCJleHAiOjE2NTg5MTI1MjR9.t7c7k2LbaTxsdfYjx_WC3QiP4MycU8sZryVyXQqJQH",
  },
};

const AuthProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const _validateToken = (token) => {
    try {
      const user = jwtDecode(token);
      if (user) {
        setUser(user);
        setLoggedIn(true);
        cookie.save('auth', token);
        return true;
      }
    } catch (e) {
      setError(e, 'Invalid Token');
      console.error(e);
      return false;
    }
  };

  useEffect(() => {
    const cookieToken = cookie.load('auth');
    if (cookieToken) {
      _validateToken(cookieToken);
    }
  }, []);
  
  const login = (username, password) => {
    const authUser = testUsers[username];

    if (authUser && authUser.password === password) {
      try {
        _validateToken(authUser.token);
        return true;
      } catch (e) {
        setError(e, 'Invalid Token');
        console.error(e);
        return false;
      }
    } else {
      setError('Invalid Login');
      return false;
    }
  };

  const logout = () => {
    setUser({});
    setLoggedIn(false);
  };

  const state = {
    user,
    loggedIn,
    error,
    can,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
