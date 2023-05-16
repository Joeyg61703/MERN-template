import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts';

const Register = () => {

  const [userData, setUserData] = useState(null);
  const {register} = useContext(AuthContext);

  const onChange = (value, key) => {
    setUserData((prevState) => {
      return ({
        ...prevState,
        [key]: value
      })
    })
  }

  return (
    <form onSubmit={(e) => {
      console.log(userData)
      e.preventDefault();
      register(userData)}
    }>

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

      <button >Register</button>
    </form>
  )
}

export default Register