import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminForm from '../forms/adminForm/AdminForm';
import SearchBar from '../forms/searchBar/SearchBar';
import FiltrationForm from '../forms/filtrationForm/FiltrationForm';
import Recommendations from '../forms/recommendations/Recommendations';
import Tile from '../tile/Tile';
import Copyright from '../copyright/Copyright';

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        {/* Hero unit */}
        {/* <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Recommendation system
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              It is an online platform that recommends new content to users that may interest them. Recommendations can be on music/movies/ books/news, etc.
            </Typography>
          </Container>
        </Box> */}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <AdminForm />
          <FiltrationForm />
          {/* <Recommendations /> */}
          {/* <SearchBar /> */}
          <Tile />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
