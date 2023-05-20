import { createTheme, ThemeProvider } from '@mui/material';

export const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#2C3333', // Replace with your desired primary color
      },
      secondary: {
        main: '#ff0000', // Replace with your desired secondary color
      },
      background: {
        default: "#222222"
      },
      text: {
        primary: "#ffffff"
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            color: 'white', // Change the text color
            '& .MuiInputBase-input': {
              color: 'white', // Change the input text color
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray', // Change the outline color
              },
              '&:hover fieldset': {
                borderColor: 'white', // Change the hover outline color
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Change the focused outline color
                
              },         
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Change the input label color
              opacity: 0.6
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: "white",
            textDecoration: "underline"
    }
  }
}
    }
  });

  export const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#00ff', // Replace with your desired primary color
      },
      secondary: {
        main: '#ff0000', // Replace with your desired secondary color
      },
    },
  });
