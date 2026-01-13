import type { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import OtpVerificationPage from '../pages/Registration/OTP/OtpVerificationPage';
import CompanyCreationPage from '../pages/Registration/Company/CompanyCreationPage';
import UserCreationPage from '../pages/Registration/User/UserCreationPage';
import LeaseCreationPage from '../pages/Registration/Lease/LeaseCreationPage';
import ForgotPasswordPage from '../pages/ForgetPassword/ForgotPassword/ForgotPassword';
import NewPasswordPage from '../pages/ForgetPassword/NewPassword/NewPasswordPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/verify-email',
    element: <OtpVerificationPage />,
  },
  {
    path: '/create-company',
    element: <CompanyCreationPage />,
  },
  {
    path: '/create-user',
    element: <UserCreationPage />,
  },
  {
    path: '/create-lease',
    element: <LeaseCreationPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/new-password',
    element: <NewPasswordPage />,
  },
  {
    path: '*',
    element: <HomePage />, // Fallback to home
  },
];

export default routes;
