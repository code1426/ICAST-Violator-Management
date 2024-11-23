import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ViolatorDetailPage from "./pages/ViolatorDetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FormInputPage from "./pages/FormInputPage";
import Loading from "./components/Loading";

import useInitializeDB from "./hooks/useInitializeDB";

const App = () => {
  const { loading, error } = useInitializeDB(); // Initialize the database if it's not already set up
  let role = "admin"; // for testing

  if (loading) {
    return <Loading message="Initializing..." />;
  }

  if (error && role !== "admin") {
    return (
      <div className="flex flex-col h-full w-screen items-center justify-center bg-color6">
        {error}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/formInput" element={<FormInputPage />} />
        <Route path="/home/:role" element={<HomePage />} />
        <Route path="detail/:id" element={<ViolatorDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
