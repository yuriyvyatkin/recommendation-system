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
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../../copyright/Copyright';
import {
  addUser
} from '../signInForm/SignInFormSlice';
import { useAppDispatch } from '../../../../app/hooks';

const theme = createTheme();

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [num, setNum] = useState('18');
  const [gender, setGender] = useState('');
  const [toggle, setToggle] = useState(false);
  const dispatch = useAppDispatch();

  type Field = {
    name: string;
    value: string;
  }

  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = event.currentTarget.querySelectorAll('input');
    const fieldsArray: Array<Field> = [];
    inputs.forEach((item) => {
      fieldsArray.push({name: item.name, value: item.value});
    });

    const emptyField = fieldsArray.find((field) => field.value === '');

    if (emptyField) {
      const emptyFieldName = emptyField.name.charAt(0).toUpperCase() + emptyField.name.slice(1);
      setErrorMessage(`Field "${emptyFieldName}" is required and should contain the correct value!`);

      return;
    }

    const fieldsObj = Object.fromEntries(fieldsArray.map(obj => [obj.name, obj.value]));


    // if (!emailRegex.test(fieldsObj.email)) {
    //   setErrorMessage('Please check the "Email" field validity!');

    //   return;
    // }

    if (fieldsObj.password.length < 6) {
      setErrorMessage('The "Password" field must contain at least 6 characters!');

      return;
    }

    if (+fieldsObj.age < 5 || +fieldsObj.age > 120) {
      setErrorMessage('Please fill in the "Age" field with a value between 5 and 120 inclusive!');

      return;
    }

    // console.log(fieldsObj)

    // console.log(addUser)

    dispatch(addUser(fieldsObj));

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoFocus
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number"
                  variant="outlined"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(e.target.value)}
                  value={num}
                  InputProps={{ inputProps: { min: 5, max: 120 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    name="gender"
                    open={toggle}
                    onClose={() => setToggle(!toggle)}
                    onOpen={() => setToggle(!toggle)}
                    value={gender}
                    label="Gender"
                    onChange={(event: SelectChangeEvent<typeof gender>) => setGender(event.target.value)}
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {
                  errorMessage
                    ? <Alert severity="warning"> {errorMessage} </Alert>
                    : <Alert severity="info">* — required fields</Alert>
                }
              </Grid>
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
