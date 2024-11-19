import React from "react";

const Tabs = ({ isLogin, setIsLogin }) => {
  return (
    <div className="flex">
      <button
        className={`w-1/2 text-center py-2 font-bold transition-all shadow-md ${
          isLogin ? "bg-black text-white shadow-lg" : "bg-gray-300 text-black"
        } rounded-tl-lg`}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>
      <button
        className={`w-1/2 text-center py-2 font-bold transition-all shadow-md ${
          !isLogin ? "bg-black text-white shadow-lg" : "bg-gray-300 text-black"
        } rounded-tr-lg`}
        onClick={() => setIsLogin(false)}
      >
        Signup
      </button>
    </div>
  );
};

export default Tabs;
