import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts'

import {Button} from "@mui/material"
const Home = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);

    if(isLoggedIn){
      console.log(user)
      return (
        <div>
          <h1>You are Logged In</h1>
          <h1>{user.username}</h1>
          <Button variant="contained" onClick={()=>{logout()}}>Logout</Button>
        </div>
      )
    }
    return (
    <div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
    </div>
  )
}

export default Home