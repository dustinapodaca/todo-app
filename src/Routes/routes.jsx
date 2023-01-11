import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ToDo from '../Components/ToDo';
import SettingsForm from '../Components/SettingsForm';

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/settings" element={<SettingsForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;