import React, { useContext } from 'react'
import { AuthContext } from '../contexts';

import { createTheme, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../../theme';

const ThemeHandler = ({children}) => {

    const {user} = useContext(AuthContext)
      
    console.log("Theme Handler", user);
    const isDarkMode = user ? user.preferences.darkMode : false;
  return (
         <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {children}
         </ThemeProvider>
    
  )
}

export default ThemeHandler