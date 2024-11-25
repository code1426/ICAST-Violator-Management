import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ViolatorDetailPage from "./pages/ViolatorDetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FormInputPage from "./pages/FormInputPage";
import Loading from "./components/Loading";

import useInitializeDB from "./hooks/useInitializeDB";
import RoleContext, { RoleProvider } from "./context/RoleProvider";
import { RoleContextType } from "./types/auth.types";
import { useContext } from "react";

const App = () => {
  const { loading, error } = useInitializeDB();
  const { role }: RoleContextType = useContext(RoleContext);
  // let role = "admin"; // for testing

  if (loading) {
    return <Loading message="Initializing..." />;
  }

  if (error && role !== "admin") {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-color6">
        {error}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <RoleProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/formInput"
            element={<FormInputPage />}
          />
          <Route
            path="/home"
            element={<HomePage />}
          />
          <Route
            path="detail/:id"
            element={<ViolatorDetailPage />}
          />
        </Routes>
      </RoleProvider>
    </BrowserRouter>
  );
};

export default App;
