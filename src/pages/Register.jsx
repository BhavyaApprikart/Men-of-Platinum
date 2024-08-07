import { useEffect, useState } from "react";
import Button from "../components/Button";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import graypic from './images/gray.png';
import logo from './images/logo.svg';
import regtext from './images/reg-text.svg';
import personicon from './images/person.svg';
import emailicon from './images/email.svg';
import mobileicon from './images/phone.svg';


function Register() {
  const Baseurl = 'https://api.msdhoni-menofplatinum.com';

  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animationStart, setAnimationStart] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();

  const nameRegex = /^[a-zA-Z ]{3,10}$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  const [email, setEmail] = useState("");
  const [mobilenum, setMobilenum] = useState("");

   const handleOtpVerification = async () => {

     const checkbox = document.getElementById('accepted');
     const nameInput = document.getElementById('nameinput');
     const emailInput = document.getElementById('emailinput');
     const mobileInput = document.getElementById('mobileinput');
     const nameVal = nameInput.value;
     const emailVal = emailInput.value;
     const mobVal  = mobileInput.value


     if(nameVal === '') {
      document.getElementById("nameError").textContent = "This field is required.";
     }
     else if(emailVal === ''){
      document.getElementById("emailerrorsmsg").textContent = "This field is required.";
     }
     else if(mobVal === ''){
      document.getElementById("nameError").textContent = "This field is required.";
     }
     else if(!checkbox.checked) {
      document.getElementById("checkboxerrorMsg").textContent = "You must accept the Terms & Conditions.";
     }
     else{

      document.getElementById("nameError").textContent = "";
      document.getElementById("emailerrorsmsg").textContent = "";
      document.getElementById("mobErrorMsg").textContent = "";
      document.getElementById("checkboxerrorMsg").textContent = "";
      
      setLoading(true);
      try {
        const lowercaseEmail = email.toLowerCase();
        const response = await axios.get(`${Baseurl}/api/get_otp/?email_id=${lowercaseEmail}`);
        console.log('OTP API Response:', response.data);
  
        if (response.data.status === "success") {
          console.log("OTP sent successfully");
          setClicked(true);
          setTimerActive(true);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }

    }

  }

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.get(`${Baseurl}/api/get_otp/?email_id=${lowercaseEmail}`);
      console.log('Resend OTP API Response:', response.data);

      if (response.data.status === "success") {
        console.log("OTP resent successfully");
        setTimerActive(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleRegistration = async () => {
    setLoading(true);
    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.post(`${Baseurl}/api/create_user/`, {
        email_id: lowercaseEmail,
        email_otp: otp,
        name: name,
        mobile: mobilenum,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('Create API Response:', response.data);

      if (response.data.status === "success") {
        console.log("User registered successfully");
        navigate("/message");
      } else {
        console.log("User registration failed");
        document.getElementById("userregistrationError").textContent = response.data.msg;
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (otp.length === 4) {
      handleRegistration();
    }
  }, [otp]);

  return (
    <div
      style={{
        backgroundImage: `url(${graypic})`,
      }}
      className="bg-no-repeat bg-cover w-full h-full md:rounded-xl text-white border px-6 py-10 overflow-y-scroll relative"
    >
      <img
        className="w-28 object-contain mx-auto"
        src={logo}
        alt="Logo"
      />

      <img
        className={`mx-auto my-11 ${animationStart ? " delay-500 duration-500 ease-in-out" : "scale-0 opacity-0 -translate-y-10"}`}
        src={regtext}
        alt="Logo"
      />
      <p
        className={`text-sm font-light text-center ${animationStart ? " delay-500 duration-500 ease-in-out" : "scale-0 opacity-0 -translate-y-10"}`}
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
            shouldAutoFocus={true}
            inputStyle={{
              backgroundColor: "transparent",
              width: "50px",
              height: "50px",
              paddingLeft: "5px",
              border: "1px solid white",
              borderRadius: "5px",
            }}
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>&nbsp; &nbsp;</span>}
            renderInput={(props) => <input {...props} />}
          />
          <button
            onClick={handleResendOtp}
            className="mt-4 text-sm text-blue-400 underline"
            disabled={timerActive || loading}
          >
            {timerActive ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-9">
          <div
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2 ${animationStart ? " delay-500 duration-500 ease-in-out" : " opacity-0 -translate-y-10"}`}
          >
            <img src={personicon} alt="Person Icon" />
            <input
              id="nameinput"
              className="placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1"
              type="text"
              placeholder="Name"
              required
              onBlur={(e) => {
                setName(e.target.value);

                if(e.target.value === ""){
                  document.getElementById("nameError").textContent = "This field is required.";
                }
                else if (!nameRegex.test(e.target.value)) {
                  document.getElementById("nameError").textContent = "Please enter a valid name, a minimum of three characters and maximum of 10 characters is required.";
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
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2 ${animationStart ? " delay-500 duration-500 ease-in-out" : " opacity-0 -translate-y-10"}`}
          >
            <img src={emailicon} alt="Email Icon" />
            <input
              id="emailinput"
              className="placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1"
              type="text"
              placeholder="E-mail ID"
              onBlur={(e) => {
                setEmail(e.target.value);

                if(e.target.value === ""){
                  document.getElementById("emailerrorsmsg").textContent = "This field is required.";
                }
                else if (!emailRegex.test(e.target.value.toLowerCase())) {
                  document.getElementById("emailerrorsmsg").textContent = "Please enter a valid email address";
                } else {
                  document.getElementById("emailerrorsmsg").textContent = "";
                }
              }}

              required
            />
          </div>
          <div><span id="emailerrorsmsg" className="text-red-500"></span></div>

          <div
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2 ${animationStart ? " delay-500 duration-500 ease-in-out" : " opacity-0 -translate-y-10"}`}
          >
            <img src={mobileicon} alt=" Mobile Icon" />
            <input
              id="mobileinput"
              className="placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1"
              type="text"
              placeholder="Mobile number"
              onBlur={(e) => {
                setMobilenum(e.target.value);

                if(e.target.value === ""){
                  document.getElementById("mobErrorMsg").textContent = "This field is required.";
                }
                else if (!indianPhoneNumberRegex.test(e.target.value)) {
                  document.getElementById("mobErrorMsg").textContent = "Please enter your valid 10 digit phone number.";
                } else {
                  document.getElementById("mobErrorMsg").textContent = "";
                }
              }}
              required
            />
          </div>
          <div> <span id="mobErrorMsg" className="text-red-500"></span></div>

          <div
            className={`flex text-xs gap-2 items-center ${animationStart ? " delay-500 duration-500 ease-in-out" : " opacity-0 -translate-y-10"}`}
          >
            <input
              className="bg-transparent border rounded-md"
              type="checkbox"
              id="accepted"
              name="accepted"
              value="True"
              required      
            />
            <label htmlFor="accepted"> I accept the Terms & Conditions.</label>
          </div>

          <div><span id="checkboxerrorMsg" className="text-red-500"></span></div>

          <Button
            onClick={handleOtpVerification}
            className={`"mt-40"} ${animationStart ? " delay-500 duration-500 ease-out" : " opacity-0 translate-y-10 "}`}
            title="Register"
            disabled={loading}
          />

        </div>
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader">
            <button type="button" className="bg-blue-400 p-4 rounded-full flex items-center" disabled>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
