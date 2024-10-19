import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FormInputPage from './pages/FormInputPage';
import DetailPage from './pages/ViolatorDetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Main />);
