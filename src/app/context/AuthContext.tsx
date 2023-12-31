'use client';

import { API_URL } from '@/config/constants';
import { createContext, useContext, useState } from 'react';
import { User } from '../interfaces/User';

export const AuthContext = createContext<{
  token:string;
  user: User | null;
  selectToken: (newToken: string) => void; 
  signOut: () => void;
}>({  token:'',
      user: null,
      selectToken: (newToken: string) => {},
      signOut: () => {}}
  );

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  
  async function loadUser(newToken: string) {
    try {
      const res = await fetch(`${API_URL}/auth/profile`,
      { method: 'GET',  
        headers: {'Authorization': `Bearer ${newToken}`}
      }
    );
    const data = await res.json();
    setUser(data.user);
    /*localStorage.setItem('user', JSON.stringify(data.user));*/
    }catch (e){
      console.log("error",e)
    }

  }

  const selectToken = ( newToken: string) => {
    setToken(newToken);
    loadUser(newToken);
    /*localStorage.setItem('token', newToken);*/
  };

  const signOut = () => {
    // Limpiar el token y cualquier otro estado relacionado con la sesión al hacer logout
    setToken('');
    setUser(null);
    /*console.log("logout");*/
    /*localStorage.removeItem('token');*/
  };

  return (
    <AuthContext.Provider value={{token, user, selectToken, signOut }}>
      {children}
    </AuthContext.Provider>
  )
};

