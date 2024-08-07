import React from "react";

function Button({ title, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-b from-[#4b5563] to-[#a1a1aa] p-3 border rounded-md text-lg font-semibold font-avenir ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
