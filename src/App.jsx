// import React from 'react';
import { SettingsProvider } from './Context/Settings';
import ToDo from './Components/ToDo';

const App = () => {
  return (
    <>
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    </>
  )
};

export default App;

