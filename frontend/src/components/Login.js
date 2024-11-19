import React, { useState } from "react";
import Spinner from "./Spinner";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("test1@email.com");
  const [password, setPassword] = useState("1234abc");
  const handleSubmit = (e) => {
    e.preventDefault();
    login({email, password});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-center mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        {isLoading ? (
          <Spinner color="black" />
        ) : (
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded active:scale-95 transition duration-300
            transform hover:scale-105 will-change-transform"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
};

export default Login;
