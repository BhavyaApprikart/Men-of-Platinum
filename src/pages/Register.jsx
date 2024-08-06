import { useEffect, useState } from "react";
import Button from "../components/Button";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import graypic from './images/gray.png'
import logo from './images/logo.svg';
import regtext from './images/reg-text.svg';


function Register() {

  const Baseurl = 'https://api.msdhoni-menofplatinum.com';

  const [otp, setOtp] = useState("");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [animationStart, setAnimationStart] = useState(false);

  const nameRegex = /^[a-zA-Z ]{3,10}$/;
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const indianPhoneNumberRegex = /^[789]\d{9}$/;


  useEffect(() => {
    let timer = setTimeout(() => setAnimationStart(true), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenum, setMobilenum] = useState("");


  const handleotpverification = async () => {

    try {
      const lowercaseEmail = email.toLowerCase();
      const response = await axios.get(`${Baseurl}/api/get_otp/?email_id=${lowercaseEmail}`);
      console.log(' OTP API Response:', response.data);

        if (response.status === 200) {
          console.log("OTP send successfully")
          setClicked(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }


  const handleregisteration = async () => {
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
      if (response.status === "success") {
          console.log("User registered successfully");
          navigate("/message");
      }
      else{
        console.log("User registered failed");
        document.getElementById("userregistrationError").textContent = response.data.msg;
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }


  if(otp.length === 4){
    handleregisteration();
 }

  return (
    <div 
    style={{
      backgroundImage: `url(${graypic})`,
    }}
    className="bg-no-repeat bg-cover w-full h-full md:rounded-xl   text-white border  px-6 py-10 overflow-y-scroll relative">
      <img
        className="w-28 object-contain mx-auto"
        src={logo}
        alt="Logo"
      />

      <img
        className={`mx-auto my-11 ${animationStart
            ? " delay-500 duration-500 ease-in-out"
            : "scale-0 opacity-0 -translate-y-10"
          }`}
        src={regtext}
        alt="Logo"
      />
      <p
        className={`text-sm font-light text-center ${animationStart
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
        <div className=" flex flex-col items-center gap-4 mt-9">
          <small className="text-sm font-light  text-center">
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

         {
           // <Button
          //   onClick={() => handleregisteration()}
          //   className={"mt-12"}
          //   title="Verify"
          // /> 
          }

        </div>
      ) : (
        <div className=" flex flex-col gap-4 mt-9 ">

          <div
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2  ${animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
              }`}
          >
            <img src="/images/person.svg" alt="" />
            <input
              className="{`placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1 `} "
              type="text"
              placeholder="Name"
              required
              onChange={(e) => {
                setname(e.target.value)
                if (!nameRegex.test(e.target.value)) {
                  document.getElementById("nameError").textContent = "Please enter a valid name, a minimum of three characters and maximum of 10 character is required.";
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
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2  ${animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
              }`}
          >
            <img src="/images/email.svg" alt="" />
            <input
              className="{`placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1 `} "
              type="text"
              placeholder="E-mail ID"
              onChange={(e) => {
                setEmail(e.target.value)
                if (!emailRegex.test(e.target.value.toLowerCase())) {
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
            className={`w-full px-3 py-4 flex items-center border border-white rounded-md gap-2  ${animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
              }`}
          >
            <img src="/images/phone.svg" alt="" />
            <input
              className="{`placeholder:text-white gap-2 bg-transparent text-sm outline-none flex-1 `}"
              type="text"
              placeholder="Mobile number"
              onChange={(e) => {
                setMobilenum(e.target.value)
                if (!indianPhoneNumberRegex.test(e.target.value)) {
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
            className={`flex text-xs gap-2 items-center  ${animationStart
                ? " delay-500 duration-500 ease-in-out"
                : " opacity-0 -translate-y-10"
              }`}
          >
            <input
              className="bg-transparent border rounded-md"
              type="checkbox"
              id="accepted"
              name="accepted"
              value="True"
              required
            />
            <label htmlFor="accepted" > I accept the Terms & Conditions.</label>
          </div>

          <Button
            onClick={() => handleotpverification()}
            className={`"mt-40"} ${animationStart
                ? " delay-500 duration-500 ease-out"
                : " opacity-0 translate-y-10 "
              }`}

            title="Register"
          />

        </div>
      )}


    </div>
  );
}


export default Register;
