import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '@/components/copyright/Copyright';
import {
  addUser
} from '@/pages/loginPage/loginPageSlice';
import CustomAlert from '@/components/forms/customAlert/CustomAlert';
import { useAppDispatch } from '@/app/hooks';
import { useForm, SubmitHandler } from 'react-hook-form';

const theme = createTheme();

export default function SignUpForm() {
  const [num, setNum] = useState('18');
  const [gender, setGender] = useState('');
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  type FormValues = {
    name: string;
    age: string;
    gender: string;
    email: string;
    password: string;
  }

  const submitForm: SubmitHandler<FormValues> = (data) => {
    // dispatch(addUser(data));

    reset();
  };

  const errorMessages = {
    name: null,
    age: null,
    gender: null,
    email: null,
    password: null,
  };

  if (errors) {
    if (gender) {
      delete errors.gender;
    }

    for (const fieldName in errors) {
      Object.defineProperty(errorMessages, fieldName, {
        value: (<CustomAlert fieldName={fieldName} type={errors[fieldName as keyof typeof errors]?.type as string} />),
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("name", { required: true, minLength: 3, maxLength: 35 })}
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  autoComplete="given-name"
                />
              </Grid>
              {errorMessages.name}
              <Grid item xs={12}>
                <TextField
                  {...register("age", { required: true, min: 5, max: 120, onChange: (event: React.ChangeEvent<HTMLInputElement>) => setNum(event.target.value) })}
                  value={num}
                  required
                  fullWidth
                  label="Age"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {errorMessages.age}
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    {...register("gender", { required: true, onChange: (event: SelectChangeEvent<string>) => setGender(event.target.value) })}
                    value={gender}
                    labelId="gender"
                    id="gender"
                    label="Gender"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {errorMessages.gender}
              <Grid item xs={12}>
                <TextField
                  {...register("email", { required: true, minLength: 7, maxLength: 80, pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i })}
                  required
                  fullWidth
                  label="Email"
                  autoComplete="email"
                />
              </Grid>
              {errorMessages.email}
              <Grid item xs={12}>
                <TextField
                  {...register("password", { required: true, minLength: 7, maxLength: 16, pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/ })}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  helperText="minimum of 6 characters, at least 1 number, 1 uppercase and 1 lowercase letter with no spaces"
                />
              </Grid>
              {errorMessages.password}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}