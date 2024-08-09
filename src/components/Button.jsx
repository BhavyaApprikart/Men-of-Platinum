import React from "react";

function Button({ title, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={` text-black leading-[19.8px] tracking-[0.04em] text-center w-full bg-gradient-to-b from-[#DBDBDB] to-[#656565] p-3  py-[14.5px] border border-white rounded-md text-lg font-semibold font-avenir ${className}`}
    >
      {title}
    </button>
  );
}

export default Button;
