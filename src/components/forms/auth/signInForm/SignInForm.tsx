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
import Copyright from '@/components/copyright/Copyright';
import CustomAlert from '@/components/forms/customAlert/CustomAlert';
import { useAppSelector } from '@/app/hooks';
// import { validatePassword } from "hashed-password";
import { useForm, SubmitHandler } from 'react-hook-form';

const theme = createTheme();

export default function SignInForm() {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormValues>();

  type FormValues = {
    email: string;
    password: string;
  }

  type User = {
    id: string,
    name?: string,
    gender?: string,
    age?: number,
    email: string,
    // password: {
    //   salt: string;
    //   hash: string;
    // },
    password: string,
    role: string;
  };

  type State = {
    users: Array<User>;
  };

  const users: Array<User> = useAppSelector((state: State) => state.users.slice());
  // const users: Array<User> = useAppSelector((state: State) => state.users.map((user: User) => {user.id, user.name, user.email, user.password}));

  const submitForm: SubmitHandler<FormValues> = (data) => {
    // const index = users.findIndex(user => {
    //   if (user.email === data.email && validatePassword(data.password, user.password.salt, user.password.hash)) {
    //     return true;
    //   }

    //   return false;
    // });

    // if (index === -1) {
    //   setError('password', { type: 'pattern' }, { shouldFocus: true });
    // } else {
    //   reset();
    // }
  };

  const errorMessages = {
    email: null,
    password: null,
  };

  if (errors) {
    for (const fieldName in errors) {
      Object.defineProperty(errorMessages, fieldName, {
        value: (<CustomAlert name={fieldName} type={errors[fieldName as keyof typeof errors]?.type as string} />),
      });
    }
  }

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
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    {...register("email", { required: true, minLength: 7, maxLength: 80, pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i })}
                    required
                    margin="normal"
                    fullWidth
                    label="Email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                {errorMessages.email}
                <Grid item xs={12}>
                  <TextField
                    {...register("password", { required: true, minLength: 6, maxLength: 16, pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/ })}
                    required
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                  />
                </Grid>
                {errorMessages.password}
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
