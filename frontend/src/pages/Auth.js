import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Tabs from "../components/Tabs";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center my-[7%]">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <Tabs isLogin={isLogin} setIsLogin={setIsLogin} />
        <div className="mt-6">
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
