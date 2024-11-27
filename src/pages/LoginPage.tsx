import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Spinner } from "react-activity";
import toast, { Toaster } from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const formInitialvalues: LoginFormData = {
    email: "",
    password: "",
  };

  const [loginFormData, setLoginFormData] = useState(formInitialvalues);
  const [errors, setErrors] = useState(formInitialvalues);
  const { submitLogin, loading, error, setError } = useLogin();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value,
    });

    // Clear errors when user types/selects a value
    if (event.target.value !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [event.target.name]: "",
      }));
      setError("");
    }
  };

  const handleCheckErrors = (): boolean => {
    let hasErrors = false;
    const newErrors: LoginFormData = {
      email: "",
      password: "",
    };

    Object.keys(loginFormData).forEach((key) => {
      if (loginFormData[key as keyof typeof loginFormData] === "") {
        newErrors[
          key as keyof LoginFormData
        ] = `Please fill out the ${key.replace(/([A-Q, S-Z])/g, " $1")}.`;
        hasErrors = true;
      }

      setErrors(newErrors);
    });
    return hasErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = handleCheckErrors();

    if (!hasErrors) {
      const success = await submitLogin(loginFormData);
      if (success) {
        toast.success("Login successful!");
      } else {
        toast.error("Invalid login credentials.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="../assets/ICAST-Logo.png"
            alt="Logo"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={loginFormData.email}
              onChange={handleChange}
              className={`${
                errors.email || error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-blue-500"
              } w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginFormData.password}
              onChange={handleChange}
              className={`${
                errors.password || error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-blue-500"
              } w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full bg-blue-500 h-11 text-white py-2 rounded-md hover:bg-blue-600 transition-colors justify-center items-center"
          >
            {loading ? (
              <Spinner size={10} color="#fff" animating={loading} />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
