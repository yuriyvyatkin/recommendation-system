import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../../copyright/Copyright';
import { useAppSelector } from '../../../../app/hooks';
import { validatePassword } from "hashed-password";

const theme = createTheme();

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");

  type User = {
    id: string,
    name?: string,
    gender?: string,
    age?: number,
    email: string,
    password: {
      salt: string;
      hash: string;
    },
    role: string;
  };

  type State = {
    users: Array<User>;
  };

  type Fields = {
    email: string;
    password: string;
    remember: FormDataEntryValue | string;
  }

  const users: Array<User> = useAppSelector((state: State) => state.users.slice());
  // const users: Array<User> = useAppSelector((state: State) => state.users.map((user: User) => {user.id, user.name, user.email, user.password}));
  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields: Fields = {
      email: data.get('email') as string,
      password: data.get('password') as string,
      remember: data.get('remember') ?? '',
    };

    // if (fields.email || !emailRegex.test(fields.email)) {
    //   setErrorMessage(`Field "Email" is required and should contain the correct value!`);

    //   return;
    // }

    // if (fields.password || fields.password.length < 6) {
    //   setErrorMessage(`Field "Password" is required and should contain the correct value!`);

    //   return;
    // }

    const index = users.findIndex(user => {
      if (user.email === fields.email && validatePassword(fields.password, user.password.salt, user.password.hash)) {
        return true;
      }

      return false;
    });

    // event.currentTarget.reset();
    // setErrorMessage('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {
                    errorMessage
                      && <Alert severity="warning"> {errorMessage} </Alert>
                  }
                </Grid>
              </Grid>
            <FormControlLabel
              control={<Checkbox name="remember" value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
