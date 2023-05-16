import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts'

const Home = () => {
    const {isLoggedIn, user, logout} = useContext(AuthContext);

    if(isLoggedIn){
      console.log(user)
      return (
        <div>
          <h1>You are Logged In</h1>
          <h1>{user.username}</h1>
          <button onClick={()=>{logout()}}>Logout</button>
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