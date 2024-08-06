import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import { preloadImages } from "../components/preloadImages";
import dhonipic from './images/dhoni.png';
import vector from './images/Vector.png';
import logo from './images/logo.svg';


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
      backgroundImage: `url(${dhonipic})`,
    }} 
      className={`bg-no-repeat bg-cover w-full h-full md:rounded-xl  relative text-white ${
        animationStart
          ? "opacity-100 delay-100 duration-300 ease-in"
          : "opacity-0"
      }`}
    >
      <img
        className={`md:rounded-b-xl absolute bottom-0 w-full  ${
          animationStart
            ? "scale-100 delay-500 duration-500 ease-out"
            : "scale-0"
        } `}

        src={vector}
        alt="Vector"
      />
      <div className="  absolute bottom-0 flex flex-col justify-center items-center w-full px-6">
        <img
          className={`w-32 object-contain  ${
            animationStart
              ? " delay-500 duration-500 ease-out"
              : " opacity-0 -translate-y-52 "
          }`}

          src={logo}
          alt="men of platinum logo"
        />
        <p
          className={`text-lg  mt-8 text-center font-avenir font-semibold tracking-wide  ${
            animationStart
              ? "  delay-1000 duration-700 ease-out"
              : " opacity-0 -translate-y-3"
          }`}
        >
          Thank you for purchasing the MS Dhoni Signature Edition.
        </p>
        <p
          className={`text-sm font-light  mt-4 mb-5 text-center  tracking-wide  ${
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
          className={`mb-14 ${
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
