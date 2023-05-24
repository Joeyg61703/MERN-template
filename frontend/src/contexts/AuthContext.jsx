import React, { createContext, useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user])
  

  const register = async (userData) => {
    try{
      const response = await api.post("/auth/register", userData);

      console.log(response)
      const user = response.data.user;
      const token = response.data.token;
      setIsLoggedIn(true);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };

  const login = async (userData) => {
    try{
      const response = await api.post("/auth/login", userData);
      const user = response.data.user;
      const token = response.data.token;
      setIsLoggedIn(true);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };

  const logout = () => {   
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};