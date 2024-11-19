import React, { useState } from "react";
import Spinner from "./Spinner";
import useAuth from "../hooks/useAuth";

const Signup = () => {
  const { signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, confirmPassword, image });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-center mb-4">Signup</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your Name"
          className="w-full p-2 border rounded focus:ring-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <div className="mb-4">
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
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="w-full p-2 border rounded focus:ring-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="profilePicture" className="block mb-1 font-medium">
          Profile Picture
        </label>
        <input
          id="profilePicture"
          type="file"
          className="w-full p-2 border rounded"
          onChange={(e) => setImage(e.target.files[0])}
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
            Signup
          </button>
        )}
      </div>
    </form>
  );
};

export default Signup;
