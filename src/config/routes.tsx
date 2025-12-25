import type { RouteObject } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CompanyCreationPage from '../pages/Registration/Company/CompanyCreationPage';
import UserCreationPage from '../pages/Registration/User/UserCreationPage';
import LeaseCreationPage from '../pages/Registration/Lease/LeaseCreationPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
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
    path: '*',
    element: <HomePage />, // Fallback to home
  },
];

export default routes;
