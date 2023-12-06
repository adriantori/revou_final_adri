import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from './layouts';
import { NotificationContext, AppProvider } from './contexts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {HomePage, AuthLogoutPage} from './pages';
import { SettingsProvider } from './contexts/SettingProvider';

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