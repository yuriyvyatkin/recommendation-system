import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CustomAlert from '@/components/forms/customAlert/CustomAlert';
import { registerUser } from '@/features/account/accountActions';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { loading, userInfo, error, registered, authorized } = useAppSelector(
    (state) => state.account,
  );
  const [num, setNum] = useState('18');
  const [gender, setGender] = useState('');
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: 'Иван',
      email: 'abc@mail.ru',
      password: '123123Qq',
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (registered) navigate('/login');

    if (authorized) navigate('/user-profile');
  }, [navigate, registered, authorized]);

  const submitForm: SubmitHandler<FormValues> = (data) => {
    data.email = data.email.toLowerCase();

    dispatch(registerUser(data));
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
        value: (
          <CustomAlert
            type={errors[fieldName as keyof typeof errors]?.type as string}
          />
        ),
      });
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar>
          <VpnKeyIcon />
        </Avatar>
        <Box component="form" noValidate onSubmit={handleSubmit(submitForm)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('name', {
                  required: true,
                  minLength: 3,
                  maxLength: 35,
                  pattern:
                    /[а-яё]+/i,
                })}
                required
                fullWidth
                label="Имя"
                autoFocus
                autoComplete="given-name"
              />
              {errorMessages.name}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('age', {
                  required: true,
                  min: 5,
                  max: 120,
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                    setNum(event.target.value),
                })}
                value={num}
                required
                fullWidth
                label="Возраст"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errorMessages.age}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="gender">Пол</InputLabel>
                <Select
                  {...register('gender', {
                    required: true,
                    onChange: (event: SelectChangeEvent<string>) =>
                      setGender(event.target.value),
                  })}
                  value={gender}
                  labelId="gender"
                  id="gender"
                  label="Пол"
                >
                  <MenuItem value="">
                    <em>не указан</em>
                  </MenuItem>
                  <MenuItem value={'male'}>мужской</MenuItem>
                  <MenuItem value={'female'}>женский</MenuItem>
                </Select>
              </FormControl>
              {errorMessages.gender}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('email', {
                  required: true,
                  minLength: 7,
                  maxLength: 80,
                  pattern:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                })}
                required
                fullWidth
                label="Почта"
                autoComplete="email"
              />
              {errorMessages.email}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password', {
                  required: true,
                  minLength: 7,
                  maxLength: 16,
                  pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                })}
                required
                fullWidth
                label="Пароль"
                type="password"
                autoComplete="new-password"
                helperText="Мин. 6 символов, 1 число, 1 символ верхнего и 1 нижнего регистра, без пробелов."
              />
            </Grid>
            {errorMessages.password}
          </Grid>
          {error && (
            <Box sx={{ mt: 1 }}>
              <CustomAlert>{error}</CustomAlert>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress color="inherit" /> : 'Зарегистрироваться'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Уже есть аккаунт? Войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
