import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useGetUserDetailsQuery } from '@/app/services/accountService';
import '@/assets/header.css';
import { logout, setCredentials } from '@/features/account/accountSlice';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const { userInfo } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <header>
      <div className="header-status">
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
        </span>
        <div className="cta">
          {userInfo ? (
            <button className="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="container navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/user-profile">Profile</NavLink>
      </nav>
    </header>
  );
};

export default Header;
