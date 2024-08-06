import  { useEffect, useState } from "react";
import blurdhoni from './images/blur-dhoni.png';

function Splash2() {
  const [animationStart, setAnimationStart] = useState(false);
  useEffect(() => {
    return () => {
      setAnimationStart(true);
    };
  }, []);
  return (
    <div className="w-full h-screen flex items-center justify-center md:rounded-xl overflow-hidden bg-black">
      <div
        style={{
          backgroundImage: `url(${blurdhoni})`,
        }} 

        className={`bg-no-repeat bg-cover w-full h-full   relative text-white ${
          animationStart
            ? " delay-300 duration-500 ease-in-out"
            : "opacity-0 scale-0"
        }`}
      >
        <div className=" absolute bottom-0 flex flex-col justify-center items-center w-full px-6 pb-14 ">
          <img
            className={`w-32 object-contain ${
              animationStart
                ? " delay-300 duration-500 ease-in-out"
                : "opacity-45 -translate-y-80"
            }`}
            src="./images/logo.svg"
            alt=""
          />
          <div
            className={`${
              animationStart
                ? " delay-1000 duration-500 ease-in-out"
                : "opacity-0 -translate-y-32"
            }`}
          >
            <p className="text-lg  mt-8 text-center font-avenir font-semibold tracking-wide">
              Thank you for being a part of the Men of Platinum family.
            </p>
            <p className="text-sm font-light  mt-4 mb-5 text-center  tracking-wide">
              Your personalized message from our Man of Platinum, MS Dhoni, is
              on the way & will be delivered to your mailbox in 15 minutes!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Splash2;
