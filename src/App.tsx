import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import routes from './config/routes';
import { Header } from './components/Header';
import { RegistrationWrapper } from './pages/Registration/Registration';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      {/* The Header is now global across all routes */}
      <Header />
      {/* AppRoutes handles the switching of the page content */}
      <RegistrationWrapper>
        <AppRoutes />
      </RegistrationWrapper>
    </BrowserRouter>
  );
}

export default App;
