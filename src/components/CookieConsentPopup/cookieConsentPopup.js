"use client";
import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const CookieConsentPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  useEffect(() => {
    const isPopupClosed = Cookies.get("cookieConsentClosed");
    if (isPopupClosed === "true") {
      setShowPopup(false);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    Cookies.set("cookieConsentClosed", "true", { expires: 365 });
  };

  const popupVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "tween",
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.6,
        type: "tween",
        delay: 0.5,
      },
    },
  };

  const languageText = {
    ENG: {
      cookieMessage:
        "Also cookies help us improve your website experience. By continuing, you agree to our use of cookies. I understand that my information will be used in accordance with Ghmza's",
      privacyPolicy: "Privacy Policy",
    },
    AR: {
      cookieMessage:
        "تساعدنا ملفات تعريف الارتباط (الكوكيز / بسكوت المتصفح 🍪) في تحسين تجربتك على الموقع. بمتابعة استخدام الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط. أفهم أن معلوماتي سيتم استخدامها وفقًا لسياسة الخصوصية الخاصة بشركة غمزة.",
      privacyPolicy: "سياسة الخصوصية",
    },
  };

  if (!showPopup) {
    return null;
  }

  return (
    <motion.div
      className={`z-50 fixed bottom-0 right-0 ${
        selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
      }`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={popupVariants}
    >
      <div className="bg-pink px-8 pt-8 sm:pt-0 sm:w-[502px] sm:h-[149px] flex flex-col-reverse sm:flex-row items-center">
        <div
          className={`sm:w-1/4 py-5 ${
            selectedLanguage === "ENG" ? "pr-8" : "pl-8"
          }`}
        >
          <TfiClose
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div className="sm:w-1/1">
          <p className="w-full text-white text-[13.84px] sm:text-[17.86px] font-normal leading-4 sm:leading-5 tracking-[-0.17px] sm:tracking-[-0.22px]">
            {languageText[selectedLanguage]?.cookieMessage}
            <br />
            <Link href="privacyPolicy" className="underline">
              {" "}
              {languageText[selectedLanguage]?.privacyPolicy}
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsentPopup;
