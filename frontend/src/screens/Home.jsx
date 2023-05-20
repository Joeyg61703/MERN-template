import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts'

import {Button, Container, CssBaseline} from "@mui/material"
import Navbar from '../components/Navbar'
const Home = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);
    console.log(isLoggedIn)

    const navigate = useNavigate();

    
    if(isLoggedIn){
      console.log(user)
      return (
        <Container component="main" maxWidth="xs">
      
          <h1>You are Logged In</h1>
          <h1>{user && user.username}</h1>
          <Button variant="contained" onClick={()=>{logout()}}>Logout</Button>
          <Button variant="contained" onClick={()=>{navigate("/profile/settings")}}>Settings</Button>
        </Container>
      )
    }
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        
    </Container>
  )
}

export default Home