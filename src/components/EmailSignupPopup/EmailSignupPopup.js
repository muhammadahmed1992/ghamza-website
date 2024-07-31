"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

const EmailSignupPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(true);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(true);
        setLoading(false);
      }, 60000);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    console.log("Email submitted:", email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    console.log("Submitting email:", email);
    setSubmitSuccess(true);
    localStorage.setItem("hasSeenPopup", "true");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  if (loading) {
    return null;
  }

  if (!showPopup) {
    return null;
  }

  return (
    <div
      className={`hidden sm:block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 
      ${selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"}`}
    >
      <div className="bg-pink text-white p-[50px] w-[357px] sm:w-[530px] relative">
        <TfiClose
          size={30}
          color="white"
          className={`absolute top-3 ${
            selectedLanguage === "ENG" ? "right-4" : "left-4"
          } cursor-pointer`}
          onClick={handleClose}
        />
        <h2 className=" text-[16.17px] sm:text-2xl font-bold leading-[25px] mb-2 uppercase">
          {selectedLanguage === "ENG" ? "MOREE Ghmza FOR YOU" : "تحب غمزة؟ اشترك بنشراتنا الاخبارية"}
        </h2>
        <p className="mb-4 text-[12.03px] sm:text-[17.86px] font-normal tracking-[-0.22px] leading-[23.94px]">
          {selectedLanguage === "ENG"
            ? "Get our emails. Latest stuff we do, and sometimes we just want to say hi."
            : "نقوم بإرسال اشياء جميلة بين الفينة والاخرى"}
        </p>
        {submitSuccess ? (
          <p className="mb-4">Success!</p>
        ) : (
          <div className="flex items-center mb-4">
            <div className="w-[11px] h-[75px] border  " />
            <div className="relative h-[63px]">
              <input
                type="email"
                placeholder={
                  selectedLanguage === "ENG" ? "Email" : "البريد الإلكتروني"
                }
                className="bg-pink w-full h-full p-4 border border-l-0 border-white  outline-none  placeholder:text-[7.8px] placeholder:font-bold placeholder:absolute placeholder:top-[9px] placeholder:text-white"
                autoComplete="email"
                onChange={handleEmailChange}
                value={email}
              />
              <div
                className={`flex gap-1 absolute -top-[6px] ${
                  selectedLanguage === "ENG" ? "left-2" : "right-2"
                }`}
              >
                <div className="w-[11px] h-[6px] border border-b-0 " />
                <div className="w-[11px] h-[6px] border border-b-0 " />
                <div className="w-[11px] h-[6px] border border-b-0 " />
              </div>
            </div>
            <button
              className="bg-white text-black w-40 h-[63px] text-gray-900 p-4 uppercase"
              onClick={handleSubmit}
            >
              {selectedLanguage === "ENG" ? "LET'S GO" : "هيا بنااا"}
            </button>
          </div>
        )}
        {emailError && <p className="text-xs mb-2">{emailError}</p>}
        <p className="text-[8.08px] sm:text-xs font-normal leading-[15.6px] tracking-[-0.08px]  mb-4">
          {selectedLanguage === "ENG"
            ? "I understand that my information will be used in accordance with Ghmza's"
            : "من خلال تسجيلك، فإنك توافق على "}
          <Link href="privacyPolicy" className="underline">
            {selectedLanguage === "ENG" ? "Privacy Policy." : " شروط الخصوصية"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default EmailSignupPopup;
