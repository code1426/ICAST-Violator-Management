import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ViolatorDetailPage from "./pages/ViolatorDetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FormInputPage from "./pages/FormInputPage";
import Loading from "./components/Loading";

import useInitializeDB from "./hooks/useInitializeDB";
import RoleContext from "./context/RoleProvider";
import { RoleContextType } from "./types/auth.types";
import { useContext } from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { loading: loadingDB, error: errorDB } = useInitializeDB();
  const { isAuthenticated, loading: authLoading, error: errorAuth } = useAuth();
  const { role }: RoleContextType = useContext(RoleContext);

  if (loadingDB || authLoading) {
    return <Loading message="Initializing..." />;
  }

  if ((errorDB || errorAuth) && role !== "Encoder") {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-color6">
        {errorDB || errorAuth}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/formInput"
          element={
            isAuthenticated ? <FormInputPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="detail/:id"
          element={
            isAuthenticated ? <ViolatorDetailPage /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
