import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Error from '@/components/Error';
import Spinner from '@/components/Spinner';
import { logInUser } from '@/features/account/accountActions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { loading, error, authorized } = useAppSelector(
    (store) => store.account,
  );
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: 'abc@mail.ru',
      password: '123',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) navigate('/user-profile');
  }, [navigate, loading, authorized]);

  const submitForm = (data: FormValues) => {
    dispatch(logInUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-input"
          {...register('email')}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-input"
          {...register('password')}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : 'Login'}
      </button>
    </form>
  );
};

export default LoginPage;
