import React, { createContext, useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      let user = null;
      try{
        const response = await api.get("/auth/user");
        user = response.data.user;

      }catch(error){
        console.log("Failed to fetch user.");
        console.error(error);
      }finally{
        return user;
      }
      
    }
    const token = localStorage.getItem("token");
    if(token && !user){
      const fetchedUser = fetchUser();
      setUser(fetchedUser);
    }
  }, [user]); 

  const register = async (userData) => {
    try{
      const response = await api.post("/auth/register", userData);
      const user = response.data.user;
      setIsLoggedIn(true);
      setUser(user);
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };

  const login = async (userData) => {
    try{
      const response = await api.post("/auth/login", userData);
      const user = response.data.user;
      setIsLoggedIn(true);
      setUser(user);
      navigate('/');
    }catch(error){
      console.error(error);
    }
  };

  const logout = () => {   
    localStorage.setItem("token", null);
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};