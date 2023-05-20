import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

//Screen Elements
import {Home, Register, Login} from "./screens";
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeHandler from './components/ThemeHandler';
import { CssBaseline } from '@mui/material';
import Profile from './screens/Profile';
import PageNotFound from './screens/PageNotFound';


const App = () => {
  return (
    <Router>
      <AuthProvider>
     <ThemeHandler>
        <Navbar/>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="*" element={<PageNotFound/>}/>
          

        </Routes>
        </ThemeHandler>
      </AuthProvider>
    </Router>
  )
}

export default App