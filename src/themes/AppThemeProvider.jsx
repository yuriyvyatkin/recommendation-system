import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';

function AppThemeProvider({ children }) {
  const theme = responsiveFontSizes(
    createTheme({
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiFormHelperText-root': {
                color: 'gray',
              },
            },
          },
        },
        MuiAvatar: {
          styleOverrides: {
            root: {
              backgroundColor: '#1976d2',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
      },
      // palette: {
      //   primary: {
      //     main: '#DD3333',
      //   },
      //   secondary: {
      //     main: '#222489',
      //   },
      //   gradient: {
      //     bronze: 'linear-gradient(180deg, #9C6D3E 0%, #E8C8A9 100%)',
      //     silver: 'linear-gradient(180deg, #808080 0%, #DFDFDF 100%)',
      //     gold: 'linear-gradient(180deg, #A3873C 0%, #E3D294 100%)',
      //   },
      // },
      // typography: {
      //   fontFamily: 'Lato, sans-serif',
      //   fontstyle: 'normal',
      //   body1: {
      //     lineHeight: '20px',
      //   },
      //   body2: {
      //     lineHeight: '18px',
      //   },
      //   body3: {
      //     fontSize: '12px',
      //     lineHeight: '16px',
      //     display: 'block',
      //   },
      //   body4: {
      //     fontSize: '10px',
      //     lineHeight: '14px',
      //     display: 'block',
      //   },
      // },
      // components: {
      //   // CSS BODY
      //   MuiCssBaseline: {
      //     styleOverrides: {
      //       body: {
      //         backgroundColor: '#000',
      //         color: '#fff',
      //         height: '100%',
      //       },
      //     },
      //   },
      //   MuiLink: {
      //     styleOverrides: {
      //       root: {
      //         cursor: 'pointer',
      //         textDecoration: 'none',
      //         lineHeight: '16px',
      //         transition: 'all 0.1s ease-in-out',
      //         '&:hover': {
      //           opacity: 0.8,
      //         },
      //       },
      //     },
      //   },
      //   MuiIconButton: {
      //     styleOverrides: {
      //       root: {
      //         aspectRatio: '1/1',
      //       },
      //     },
      //   },
      // },
    }),
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default AppThemeProvider;
