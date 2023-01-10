// import React from 'react';
import { SettingsProvider } from './Context/Settings';
import Header from './Components/Header';
import ToDo from './Components/ToDo';
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <SettingsProvider>
        <Header />
        <ToDo />
        <Footer />
      </SettingsProvider>
    </>
  )
};

export default App;

