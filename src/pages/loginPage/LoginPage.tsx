import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CustomAlert from '@/components/forms/customAlert/CustomAlert';
import { logInUser } from '@/features/account/accountActions';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      email: 'abc@mail.ru',
      password: '123',
      remember: false,
    },
  });
  const { loading, error, authorized, userToken, userInfo } = useAppSelector(
    (store) => store.account,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate('/user-profile')
    };
  }, [navigate, loading, authorized]);

  const submitForm: SubmitHandler<FormValues> = (data) => {
    dispatch(logInUser(data));
  };

  const errorMessages = {
    email: null,
    password: null,
  };

  if (errors) {
    for (const fieldName in errors) {
      Object.defineProperty(errorMessages, fieldName, {
        value: (<CustomAlert fieldName={fieldName} type={errors[fieldName as keyof typeof errors]?.type as string} />),
      });
    }
  }

  return (
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate>
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
                  {...register("password", { required: true, minLength: 3, maxLength: 16 })}
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
            {error && <Box sx={{ mt: 1 }}><CustomAlert>123</CustomAlert></Box>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress color="inherit" /> : 'Login'}
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
      </Container>
  );
}
