import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { preloadImages } from "../components/preloadImages";
import dhonipic from "./images/dhoni.png";
import vector from "./images/Vector.png";

import logo from "./images/logo.svg";

import bg from "../pages/images/bg.png"

function Splash() {
  const navigate = useNavigate();

  const [animationStart, setAnimationStart] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setAnimationStart(true), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className={`bg-no-repeat bg-cover  w-full h-full md:rounded-xl  relative text-white ${
        animationStart
          ? "opacity-100 delay-100 duration-300 ease-in"
          : "opacity-0"
      }`}
    >

      {/* <img
        className={` md:rounded-b-xl  absolute bottom-[-154px] md:bottom-[-84px] w-full  ${
          animationStart
            ? "scale-100 delay-500 duration-500 ease-out"
            : "scale-0"
        } `}
        src={vector}
        alt="white Vector"
      /> */}

      <div className="absolute bottom-[100px] md:bottom-[44px] flex flex-col justify-center items-center w-full px-6 md:">
        <img
          className={`h-[90px] object-contain ${
            animationStart
              ? " delay-500 duration-500 ease-out"
              : " opacity-0 -translate-y-52 "
          }`}
          src={logo}
          alt="men of platinum logo"
        />

        <p
          className={`w-[70%] text-white textlg text-[16px]  leading-[21.6px]  mt8  mt-3 text-center font-avenir font-semibold   ${
            animationStart
              ? "delay-1000 duration-700 ease-out"
              : "opacity-0 -translate-y-3"
          }`}
        >
          Thank you for purchasing the MS Dhoni Signature Edition.
        </p>

        <p
          className={` text-sm leading-[18.48px] text-nowrap font-[350]  mt[18.78px] mb[21px] my-2 text-center ${
            animationStart
              ? " delay-1000 duration-700 ease-out"
              : " opacity-0 -translate-y-3 "
          }`}
        >
          Here’s a memento especially crafted for you.
        </p>

        <Button
          onClick={() => navigate("/register")}
          title="Get Started"
          className={`mb-[10px] md:mb-0 text-black ${
            animationStart
              ? " delay-1000 duration-700 ease-out"
              : " opacity-0 translate-y-10 "
          }`}
        />
      </div>
    </div>
  );
}

export default Splash;