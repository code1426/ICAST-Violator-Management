import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Spinner } from "react-activity";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { submitLogin, loading, error, setError } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitLogin({ email, password });
  };

  // Error Handling
  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error!);
    setError(undefined)
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img
            src="../assets/ICAST-Logo.png"
            alt="Logo"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form
          onSubmit={handleLogin}
          className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="flex w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors justify-center items-center">
            {loading ? (
              <Spinner
                size={10}
                color="#fff"
                animating={loading}
              />
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
