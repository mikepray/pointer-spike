import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import JoinRoom from './Components/JoinRoom/JoinRoom';
import NoPage from './Components/NoPage/noPage';
import Room from './Components/Room/Room';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App/> }>
          <Route index element={ <JoinRoom />} />
          <Route path="room" element={ <JoinRoom />} />
          <Route path="room/:roomId" element={ <Room />} />
          <Route path="*" element={ <NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
