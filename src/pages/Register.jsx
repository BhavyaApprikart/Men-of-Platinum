import { useEffect, useState } from "react";
import Button from "../components/Button";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import graypic from "./images/gray.png";
import logo from "./images/logo.svg";
import regtext from "./images/reg-text.svg";
import usericon from "../pages/svgs/user.svg";
import emailicon from "./images/email.svg";
import blackEmailicon from "../pages/svgs/email-black.svg";

import userBlackIcon  from "../pages/svgs/user-black.svg";
import mobileicon from "../pages/svgs/mobileNo.svg";
import mobileiconBlack from "../pages/svgs/mobileNo-black.svg";


function Register() {
  const Baseurl = "https://api.msdhoni-menofplatinum.com";

  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animationStart, setAnimationStart] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();

  const nameRegex = /^[a-zA-Z ]{3,10}$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const indianPhoneNumberRegex = /^[6789]\d{9}$/;

  useEffect(() => {
    let timer = setTimeout(() => setAnimationStart(true), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev > 0) return prev - 1;
          setTimerActive(false);
          return 45;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const [name, setName] = useState("");

  console.log(name);
  
  const [email, setEmail] = useState("");
  const [mobilenum, setMobilenum] = useState("");


  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isMobileNumFilled, setIsMobileNumFilled] = useState(false);

 



  const handleOtpVerification = async () => {
    const checkbox = document.getElementById("accepted");
    const nameInput = document.getElementById("nameinput");
    const emailInput = document.getElementById("emailinput");
    const mobileInput = document.getElementById("mobileinput");
    const nameVal = nameInput.value;
    const emailVal = emailInput.value;
    const mobVal = mobileInput.value;

    if (nameVal === "") {
      document.getElementById("nameError").textContent =
        "This field is required.";
    } else if (emailVal === "") {
      document.getElementById("emailerrorsmsg").textContent =
        "This field is required.";
    } else if (mobVal === "") {
      document.getElementById("nameError").textContent =
        "This field is required.";
    } else if (!checkbox.checked) {
      document.getElementById("checkboxerrorMsg").textContent =
        "You must accept the Terms & Conditions.";
    } else {
      document.getElementById("nameError").textContent = "";
      document.getElementById("emailerrorsmsg").textContent = "";
      document.getElementById("mobErrorMsg").textContent = "";
      document.getElementById("checkboxerrorMsg").textContent = "";

      setLoading(true);
      try {
        const lowercaseEmail = email.toLowerCase();
        const response = await axios.get(
          `${Baseurl}/api/get_otp/?email_id=${lowercaseEmail}`
        );
        console.log("OTP API Response:", response.data);

        if (response.data.status === "success") {
          console.log("OTP sent successfully");
          setClicked(true);
          setTimerActive(true);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.get(
        `${Baseurl}/api/get_otp/?email_id=${lowercaseEmail}`
      );
      console.log("Resend OTP API Response:", response.data);

      if (response.data.status === "success") {
        console.log("OTP resent successfully");
        setTimerActive(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async () => {

          setLoading(true);
          try {
            const lowercaseEmail = email.toLowerCase();
            const response = await axios.post(
              `${Baseurl}/api/create_user/`,
              {
                email_id: lowercaseEmail,
                email_otp: otp,
                name: name,
                mobile: mobilenum,
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            console.log("Create API Response:", response.data);

            if (response.data.status === "success") {
              console.log("User registered successfully");
              navigate("/message");
            } else {
              console.log("User registration failed");
              document.getElementById("userregistrationError").textContent =
                response.data.msg;
            }
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setLoading(false);
          }

  };


  const [cellColors, setCellColors] = useState(Array(4).fill('#202020'));
  console.log(cellColors);
  

  const handleOnChange = (value,index) => {
    setOtp(value);
    const newColors = [...cellColors];
    newColors[index] = !value ? 'white' : '#202020'; 
    setCellColors(newColors);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsNameFilled(e.target.value.trim() !== "");
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailFilled(e.target.value !== "");
  };
  
  const handleMobileChange = (e) => {
    setMobilenum(e.target.value);
    setIsMobileNumFilled(e.target.value.trim() !== "");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${graypic})`,
      }}
      className="bg-no-repeat bg-cover w-full h-full md:rounded-xl text-white border px-6 py-10 overflow-y-scroll md:overflow-y-auto relative"
    >
      <img
        className="w-[117px] md:w-[px]  object-contain mx-auto"
        src={logo}
        alt="Logo"
      />

      <img
        className={`mx-auto my-11 ${
          animationStart
            ? " delay-500 duration-500 ease-in-out"
            : "scale-0 opacity-0 -translate-y-10"
        }`}
        src={regtext}
        alt="Logo"
      />
      <p
        className={`font- text-[14px] leading-[17px] font-[350px] text-center ${
          animationStart
            ? " delay-500 duration-500 ease-in-out"
            : "scale-0 opacity-0 -translate-y-10"
        }`}
      >
        {clicked
          ? "Register"
          : "Please enter your details to receive a personalized message from the legend itself."}
      </p>

      <span id="userregistrationError" className="text-red-500 mt-12"></span>

      {clicked ? (
        <div className="flex flex-col items-center gap-4 mt-9">
          <small className="text-sm font-light text-center">
            Enter the OTP sent to your email address.
          </small>

          <OtpInput
              inputType={"tel"}
              shouldAutoFocus={true}
              inputStyle={{
              backgroundColor: "transparent",
              width: "50px",
              height: "50px",
              paddingLeft: "5px",
              borderRadius: "5px",
              boxShadow: "0px 2px 6px 0px #DBDBDB26",
              border: "1px solid ",
              borderImageSource:
                " linear-gradient(0deg, #E5E4E2, #E5E4E2),linear-gradient(91.41deg, rgba(148, 148, 148, 0.8) 0%, #F0F0F0 11.6%, rgba(134, 134, 134, 0.5) 25.6%, #E7E7E7 37.1%, #E8E8E8 50.1%, rgba(134, 134, 134, 0.4) 61.6%, #EAEAEA 73.6%, rgba(108, 108, 108, 0.7) 87.6%, #E5E4E2 100%)",
            }}
            value={otp}
            onChange={(value, index) => handleOnChange(value, index)}
            numInputs={4}

            focusStyle={{
              backgroundColor: "blue",
              color: "white",
              outline: "none",
            }}

            // focusStyle={{
            //   // outline: "none",
            //   backgroundColor: "white",
            //   color: "black",
            //   // boxShadow: "0px 2px 6px 0px #DBDBDB26",
            //   // border: "1px solid",
            //   // borderImageSource:
            //   //   "linear-gradient(0deg, #E5E4E2, #E5E4E2),linear-gradient(91.41deg, rgba(148, 148, 148, 0.8) 0%, #F0F0F0 11.6%, rgba(134, 134, 134, 0.5) 25.6%, #E7E7E7 37.1%, #E8E8E8 50.1%, rgba(134, 134, 134, 0.4) 61.6%, #EAEAEA 73.6%, rgba(108, 108, 108, 0.7) 87.6%, #E5E4E2 100%)",
            // }}

            renderSeparator={<span>&nbsp; &nbsp;</span>}
            renderInput={(props) => <input {...props} />}
          />

          <Button
            onClick={handleRegistration}
            className={`mt-12 ${
              animationStart
                ? " delay-500 duration-500 ease-out"
                : " opacity-0 translate-y-10 "
            }`}
            title="Submit"
            disabled={otp.length!==4}
          />

          <button
            onClick={handleResendOtp}
            className="mt-4 text-sm text-blue-400 underline"
            disabled={timerActive || loading}
          >
            {timerActive ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>
      ) : (
        // background: ;
        // box-shadow: 0px 2px 6px 0px #DBDBDB26;

        <div className="flex flex-col gap-4 md:gap-2 mt-9">
          <div
            id="myInput"
            className={`${
              isNameFilled ? "bg-[#EAEAEA]" : "bg-[#202020]"
            }   w-full px-3 py-[14.5px] tracking-[0.06em] text-center flex items-center gradient-input rounded-md gap-2   ${
              animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
            }`}
          >
            <img
              src={!isNameFilled ? usericon : userBlackIcon}
              alt="Person Icon"
            />

            <input
              // onChange={(e) => {
              //   setIsNameFilled(e.target.value.trim() !== "");

              // }}

              onChange={handleNameChange}
              
              id="nameinput"
              className={` ${!isNameFilled ? "caret-white" : "caret-black" }   placeholder:text-white text-black gap-2 bg-transparent text-sm  font-[350] leading-[19.6px] outline-none flex-1`}
              type="text"
              placeholder="Name"
              required
              onBlur={(e) => {

                setName(e.target.value);

                if (e.target.value === "") {
                  document.getElementById("nameError").textContent =
                    "This field is required.";
                } else if (!nameRegex.test(e.target.value)) {
                  document.getElementById("nameError").textContent =
                    "Please enter a valid name, a minimum of three characters and maximum of 10 characters is required.";
                } else {
                  document.getElementById("nameError").textContent = "";
                }
              }}
            />
          </div>
          <div>
            <span id="nameError" className="text-red-500"></span>
          </div>

          <div
            id="myInput"
            className={`   *:  
              ${
              isEmailFilled ? "bg-[#EAEAEA]" : "bg-[#202020]"
            }  w-full px-3 py-[14.5px] flex items-center gradient-input rounded-md gap-2 ${
              animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
            }`}
          >
            <img
              src={!isEmailFilled ? emailicon : blackEmailicon}
              alt="Email Icon"
            />

            <input
              // onChange={(e) => setIsEmailFilled(e.target.value !== "")}
              onChange={handleEmailChange}
              id="emailinput"
              className={`${!isEmailFilled ? "caret-white" : "caret-black" }     placeholder:text-white text-black gap-2 bg-transparent text-sm outline-none flex-1`}
              type="email"
              placeholder="E-mail ID"
              onBlur={(e) => {
                setEmail(e.target.value);

                if (e.target.value === "") {
                  document.getElementById("emailerrorsmsg").textContent =
                    "This field is required.";
                } else if (!emailRegex.test(e.target.value.toLowerCase())) {
                  document.getElementById("emailerrorsmsg").textContent =
                    "Please enter a valid email address";
                } else {
                  document.getElementById("emailerrorsmsg").textContent = "";
                }
              }}
              required
            />
          </div>
          <div>
            <span id="emailerrorsmsg" className="text-red-500"></span>
          </div>

          <div
            id="myInput"
            className={`${
              isMobileNumFilled ? "bg-[#EAEAEA]" : "bg-[#202020]"
            }  w-full px-3 py-[14.5px] flex items-center gradient-input rounded-md gap-2 ${
              animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
            }`}
          >
            <img
              src={!isMobileNumFilled ? mobileicon : mobileiconBlack}
              alt=" Mobile Icon"
            />

            <input
              // onChange={(e) =>
              //   setIsMobileNumFilled(e.target.value.trim() !== "")
              // }

              onChange={handleMobileChange}

              id="mobileinput"
              className={`${!isMobileNumFilled ? "caret-white" : "caret-black" }     placeholder:text-white text-black gap-2 bg-transparent text-sm outline-none flex-1`}
              type="tel"
              maxLength={10}
              minLength={10}
              placeholder="Mobile number"
              onBlur={(e) => {
                setMobilenum(e.target.value);

                if (e.target.value === "") {
                  document.getElementById("mobErrorMsg").textContent =
                    "This field is required.";
                } else if (!indianPhoneNumberRegex.test(e.target.value)) {
                  document.getElementById("mobErrorMsg").textContent =
                    "Please enter your valid 10 digit phone number.";
                } else {
                  document.getElementById("mobErrorMsg").textContent = "";
                }
              }}
              required
            />
          </div>
          <div>
            {" "}
            <span id="mobErrorMsg" className="text-red-500"></span>
          </div>

          <div
            className={`flex text-xs gap-2 items-center mt-3 ${
              animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
            }`}
          >
            <input
              className="bg-transparent border rounded-md "
              type="checkbox"
              id="accepted"
              name="accepted"
              value="True"
              required
            />

            <label
              className="text-xs font-[350] leading-[14.64px] text-left font-avenirLight"
              htmlFor="accepted"
            >
              I accept the{" "}
              <span className="underline font-bold">Terms & Conditions.</span>
            </label>
          </div>

          <div>
            <span id="checkboxerrorMsg" className="text-red-500"></span>
          </div>

          <Button
            onClick={handleOtpVerification}
            className={`mt-12 ${
              animationStart
                ? " delay-500 duration-500 ease-out"
                : " opacity-0 translate-y-10 "
            }`}
            title="Register"
            disabled={loading}
          />
        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader">
            <button
              type="button"
              className="bg-blue-400 p-4 rounded-full flex items-center"
              disabled
            >
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;