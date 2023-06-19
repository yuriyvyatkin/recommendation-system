import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
// import LoginPage from '@/pages/LoginPage';
import ProfilePage from '@/pages/ProfilePage';
// import RegisterPage from '@/pages/RegisterPage';
import RegisterPage from '@/pages/registerPage/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/pages/loginPage/LoginPage';

function Routing() {
  return (
    <>
      {/* <Header /> */}
      <main className="container content">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default Routing;
