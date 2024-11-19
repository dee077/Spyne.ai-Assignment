import { useState } from "react";
import { DOMAIN } from "../utils/constants";
import useUser from "./useUser";
import { showToast } from "../utils/toastConfig";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const { setUser } = useUser()

  const validateLoginData = (loginData) => {
    const {email, password} = loginData;

    if (!email || !password) {
      showToast("All fields are required", "error");
      return false;
    }
    return true
  };

  const login = async (loginData) => {
    if(!validateLoginData(loginData)) return
    setIsLoading(true);
    try {
      const response = await fetch(DOMAIN+"/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      // console.log("Login successful:", data);
      if (response.ok) {
        const { jwtToken, user } = data;
        sessionStorage.setItem("userData", JSON.stringify(user));
        sessionStorage.setItem("jwtToken", jwtToken);
        setUser(user)
        showToast("Login successful!");
        navigate('/')
      } else {
        showToast(data?.message, "error");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      showToast(err?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const validateSignupData = (signupData) => {
    const {name, email, password, confirmPassword } = signupData;

    if (!name || !email || !password || !confirmPassword) {
      showToast("All fields are required", "error");
      return false;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return false;
    }

    return true;
  };

  const signup = async (signupData) => {
    if (!validateSignupData(signupData)) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", signupData.name);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("image", signupData.image);

      const response = await fetch(`${DOMAIN}/api/auth/signup`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const { jwtToken, user } = data;
        sessionStorage.setItem("userData", JSON.stringify(user));
        sessionStorage.setItem("jwtToken", jwtToken);
        setUser(user);
        showToast("Signup successful!");
        navigate('/')
      } else {
        showToast(data?.message, "error");
      }
    } catch (err) {
      console.error("Signup error:", err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return { login, isLoading, signup };
};

export default useAuth;
