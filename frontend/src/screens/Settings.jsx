import React, { useContext, useState } from 'react'

import {Box, Button, Card, Container, Switch, Typography, useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts';
import api from '../api';

const Settings = () => {
  const {user, setUser} = useContext(AuthContext);

  const [settings, setSettings] = useState(user?.preferences || {});

  const theme = useTheme();
  const navigate = useNavigate();

  const submitChanges = async () => {
    try{
      const response = await api.post("/auth/user/settings", settings);
      const updatedUser = response.data.user;
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // navigate("/");
    }catch(error){
      console.log(error);
    }
    
  }
  return (
     <Container>
      <Card 
      sx={{
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        padding: 4,
        bgcolor: theme.palette.primary.main,
        mt: 2
      }}
      >
      <Typography  variant="h3" component="h1">Dark Mode</Typography>
      <Switch size="medium" 
      checked={settings.darkMode}
      onChange={(e) => {setSettings((prevState) => ({
        ...prevState,
        darkMode: e.target.checked
      }))}
      }/>
      </Card>

      <Button onClick={submitChanges}>Save Changes</Button>
     </Container>
  )
}

export default Settings