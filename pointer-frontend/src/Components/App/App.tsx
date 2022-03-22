import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import NoPage from '../NoPage/noPage';
import Layout from '../Layout/layout';
import Contact from '../Contact/contact';

import Room from '../Room/Room';
import { BrowserRouter } from 'react-router-dom';
import JoinRoom from '../JoinRoom/JoinRoom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<JoinRoom />} />
          <Route path="room" element={<Room />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
