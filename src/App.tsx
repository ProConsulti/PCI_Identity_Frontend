import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import './App.css';
import routes from './config/routes';
import { Header } from './components/Header';
import { RegistrationWrapper } from './pages/Registration/Registration';
import { OverlayProvider } from './context/OverlayContext';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <OverlayProvider>
      <BrowserRouter>
        {/* The Header is now global across all routes */}
        <Header />
        {/* AppRoutes handles the switching of the page content */}
        <ConditionalRegistrationWrapper>
          <AppRoutes />
        </ConditionalRegistrationWrapper>
      </BrowserRouter>
    </OverlayProvider>
  );
}

function ConditionalRegistrationWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideWrapperPaths = ['/forgot-password', '/new-password'];
  if (hideWrapperPaths.includes(location.pathname)) {
    return <>{children}</>;
  }
  return <RegistrationWrapper>{children}</RegistrationWrapper>;
}
export default App;
