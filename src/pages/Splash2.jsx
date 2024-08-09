import { useEffect, useState } from "react";
import blurdhoni from "./images/blur-dhoni.png";
import logo from "./images/logo.svg";

function Splash2() {
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
      backgroundImage: `url(${blurdhoni})`,
    }}
    className=" w-full pb-14 h-screen bg-no-repeat bg-cover  flex items-center justify-center md:rounded-xl overflow-y-scroll  bg-scroll  bg-black">
      <div
        // style={{
        //   backgroundImage: `url(${blurdhoni})`,
        //   backgroundSize: ``,
        // }}
        className={`bg-no-repeat bg-cover  w-full min-h-full   relative text-white ${
          animationStart
            ? " delay-300 duration-500 ease-in-out"
            : "opacity-0 scale-0"
        }`}
      >
        <div className="absolute  bottom-4 md:bottom-[-84px] flex flex-col justify-center items-center w-full px-6 pb- ">
          <img
            className={`h-[100px]  object-contain ${
              animationStart
                ? " delay-300 duration-500 ease-in-out"
                : "opacity-45 -translate-y-80"
            }`}
            src={logo}
            alt="Logo"
          />
          <div
            className={`${
              animationStart
                ? " delay-1000 duration-500 ease-in-out"
                : "opacity-0 -translate-y-32"
            }`}
          >
            <p className="text-[19px] leading-[22.8px] mt7 mt-4 text-center font-avenir font-semibold tracking-wide">
              Thank you for being a part of the Men of Platinum family.
            </p>
            <p className="text-sm font-light  mt-4  text-center  tracking-wide">
              Your personalized message from our Man of Platinum,
               <span className="font-bold"> MS Dhoni</span>, is on the way & will
              be delivered to your mailbox in 15 minutes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash2;