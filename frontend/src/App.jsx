import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//Screen Elements
import {Home, Register, Login} from "./screens";
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="register" element={<Register/>}/>
          <Route path="login" element={<Login/>}/>
          

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App