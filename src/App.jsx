import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AppRoutes from './Routes/routes';
import { SettingsProvider } from './Context/Settings';

const App = () => {
  return (
    <>
      <SettingsProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </SettingsProvider>
    </>
  )
};

export default App;
