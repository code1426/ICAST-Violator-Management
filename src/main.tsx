import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import FormInputPage from './pages/FormInputPage';
import DetailPage from './pages/ViolatorDetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import EncodeDataPage from './pages/EncodeDataPage';


const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} />
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/formInput'
          element={<FormInputPage />}
        />
        <Route
          path='/home'
          element={<HomePage />}
        />
        <Route
          path='/detail/:id'
          element={<DetailPage />}
        />
        {/* Add the new route for EditDataPage */}
        <Route
          path='/encode-data'
          element={<EncodeDataPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Main />);