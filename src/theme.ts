import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Green color for primary
      },
      secondary: {
        main: '#808080', // Green color for secondary
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34D399', // Green border when focused
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34D399', // Green border on hover
            },
          },
          notchedOutline: {
            borderColor: '#34D399', // Default border color (green)
            borderWidth: '2px', // Default border width
            borderRadius: '0.7rem', // Default border radius
            width: '100%', // Default width
          },
          input: {
            color: '#808080', // Default text color to green
            '&.Mui-focused': {
              color: '#808080', // Green text color when focused
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#808080', // Green label color by default
            '&.Mui-focused': {
              color: '#000000', // Green label when focused
            },
          },
        },
      },
    },
  });

  export const dataGridTheme = createTheme({
    palette: {
      primary: {
        main: '#059669', // Green color for primary
      },
      secondary: {
        main: '#A7F3D0', // Green color for secondary
      },
    },
    typography: {
      fontFamily: 'font-[family-name:var(--font-geist-mono)]', // Apply your custom font
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34D399', // Green border when focused
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#34D399', // Green border on hover
            },
          },
          notchedOutline: {
            borderColor: '#34D399', // Default border color (green)
            borderWidth: '2px', // Default border width
            borderRadius: '0.7rem', // Default border radius
            width: '100%', // Default width
          },
          input: {
            color: '#808080', // Default text color to green
            '&.Mui-focused': {
              color: '#808080', // Green text color when focused
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#808080', // Green label color by default
            '&.Mui-focused': {
              color: '#000000', // Green label when focused
            },
          },
        },
      },
    },
  });