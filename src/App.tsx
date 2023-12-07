import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './layouts';
import { NotificationContext, AppProvider } from './contexts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {HomePage, AuthLogoutPage, AuthLoginPage, AuthRegisterPage, BaseDisasterPage} from './pages';
import { SettingsProvider } from './contexts/SettingProvider';
import BaseFirefighterPage from './pages/BaseFirefighterPage';
import BaseMedicalPage from './pages/BaseMedicalPage';
import BasePolicePage from './pages/BasePolicePage';

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/logout',
          element: <AuthLogoutPage />,
        },
        {
          path: '/homepage',
          element: <AuthLogoutPage />,
        },
        {
          path: '/login',
          element: <AuthLoginPage />,
        },
        {
          path: '/register',
          element: <AuthRegisterPage />,
        },
        {
          path: '/bencana',
          element: <BaseDisasterPage />,
        },
        {
          path: '/damkar',
          element: <BaseFirefighterPage />,
        },
        {
          path: '/poliklinik',
          element: <BaseMedicalPage />,
        },
        {
          path: '/polisi',
          element: <BasePolicePage />,
        },
      ],
    },
  ]);

  return (
    <NotificationContext>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppProvider>
          <SettingsProvider>
            <RouterProvider router={router} />
          </SettingsProvider>
        </AppProvider>
      </LocalizationProvider>
    </NotificationContext>
  );
}

export default App;