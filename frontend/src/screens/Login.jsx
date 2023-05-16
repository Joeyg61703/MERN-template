import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts';

const Login = () => {

  const [userData, setUserData] = useState(null);
  const {login} = useContext(AuthContext);

  const onChange = (value, key) => {
    setUserData((prevState) => {
      return ({
        ...prevState,
        [key]: value
      })
    })
  }

  return (
    <form onSubmit={()=> login(userData)}>

       <input 
       onChange={(event) => onChange(event.target.value, 'username')} 
       type="text" 
       name="username" 
       />
      
      <input 
      onChange={(event) => onChange(event.target.value, 'password')} 
      type="password" 
      name="password" 
      />

      <button >Login</button>
    </form>
  )
}

export default Login