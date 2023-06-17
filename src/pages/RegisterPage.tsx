import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Error from '@/components/Error';
import Spinner from '@/components/Spinner';
import { registerUser } from '@/features/account/accountActions';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { loading, userInfo, error, registered, authorized } = useAppSelector(
    (state) => state.account,
  );
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName: 'abc',
      email: 'abc@mail.ru',
      password: '123',
      confirmPassword: '123',
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (registered) navigate('/login');

    if (authorized) navigate('/user-profile');
  }, [navigate, userInfo, registered, authorized]);

  const submitForm = (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      alert('Password mismatch');
      return;
    }

    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          className="form-input"
          {...register('firstName')}
          required
        />
      </div>
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
      <div className="form-group">
        <label htmlFor="email">Confirm Password</label>
        <input
          type="password"
          className="form-input"
          {...register('confirmPassword')}
          required
        />
      </div>
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner /> : 'Register'}
      </button>
    </form>
  );
};

export default RegisterPage;
