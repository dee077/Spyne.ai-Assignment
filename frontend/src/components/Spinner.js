import React from 'react';

const Spinner = ({ color = 'black' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-10 h-10 border-8 border-${color} border-t-gray-950 border-solid rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Spinner;
