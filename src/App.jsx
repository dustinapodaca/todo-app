import React from 'react';
import AppRoutes from './Routes/routes';
import { SettingsProvider } from './Context/Settings';
import AuthProvider from './Context/Auth';
import { MantineProvider } from '@mantine/core';

const App = () => {
  return (
    <>
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <AuthProvider>
          <SettingsProvider>
            <AppRoutes />
          </SettingsProvider>
        </AuthProvider>
      </MantineProvider>
    </>
  )
};

export default App;
