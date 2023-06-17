import { useAppSelector } from '@/app/hooks';
import { NavLink, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { userInfo } = useAppSelector((state) => state.account);

  if (!userInfo) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
