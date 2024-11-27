import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { StrictMode } from "react";

import ViolatorDetailPage from "./pages/ViolatorDetailPage";
import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
import FormInputPage from "./pages/FormInputPage";
import Loading from "./components/Loading";

import useInitializeDB from "./hooks/useInitializeDB";
import RoleContext from "./context/RoleProvider";
import { RoleContextType } from "./types/auth.types";
import { useContext } from "react";
// import useAuth from "./hooks/useAuth";

const App = () => {
  const { loading: loadingDB, error: errorDB } = useInitializeDB();
  // const { isAuthenticated, loading: authLoading, error: errorAuth } = useAuth();
  const { role }: RoleContextType = useContext(RoleContext);

  if (loadingDB) {
    return <Loading message="Initializing..." />;
  }

  if (errorDB && role !== "Encoder") {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-color6">
        {errorDB}
      </div>
    );
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/formInput" element={<FormInputPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="detail/:id" element={<ViolatorDetailPage />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
