"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import privacyPolicy from "./privacyPolicy.json";

function PrivacyPolicy() {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [dir, setDir] = useState(selectedLanguage === "ENG" ? "ltr" : "rtl");
  const [language, setLanguage] = useState(selectedLanguage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDir(selectedLanguage === "ENG" ? "ltr" : "rtl");
      setLanguage(selectedLanguage);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  const texts = privacyPolicy[language];

  return (
    <>
      <div
        dir={dir}
        className={`${isSearchOpen ? "" : "mt-[73.59px] lg:mt-[108px]"}`}
      >
        <div className="topSection h-screen md:h-auto bg-black">
          <div className="img h-[100%] p-2 flex flex-col gap-20 items-center justify-center pt-20 md:pb-36 w-full relative">
            <Image
              src="/images/privacy.jpg"
              alt="Not Found Image"
              width={500}
              height={500}
            />
            <h1
              className={`w-full ps-[16px] md:hidden text-white mb-12 font-[500] text-[48px] md:text=[55px] 2xl:text-[74px] leading-[44.16px] md:leading-[68.08px] tracking-[-1.92px] md:tracking-[-2.96] ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              {texts.title}
            </h1>
          </div>
        </div>
        <div className="contentSection px-[18px] py-[71px] md:py-[47px] w-full flex justify-center">
          <div
            className={`max-w-7xl  ${
              language === "ENG" ? "font-custom1" : "font-custom3"
            }`}
          >
            <h1 className="hidden md:block mb-12 font-[500] text-[48px] md:text=[55px] 2xl:text-[74px] leading-[44.16px] md:leading-[68.08px] tracking-[-1.92px] md:tracking-[-2.96]  ">
              {texts.title}
            </h1>
            <div className="mb-12 flex flex-col md:flex-row items-start md:items-center gap-4">
              <span className="font-normal text-[13px] md:text-[15px] leading-6 tracking-[0.06px] md:tracking-[0.08px]">
                {texts.share}
              </span>
              <span className="flex gap-4 ms-4 md:ms-0">
                <FaXTwitter size={19} />
                <BsEnvelope size={19} />
              </span>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.introduction.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.introduction.content}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.informationWeCollect.title}
              </h3>
              <p className="mb-4 text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.informationWeCollect.content[0]}
              </p>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.informationWeCollect.content[1]}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.useOfInformation.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.useOfInformation.content}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.storageOfInformation.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.storageOfInformation.content}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.security.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.security.content}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.yourChoices.title}
              </h3>
              <p className="mb-4 text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.yourChoices.content[0]}
              </p>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.yourChoices.content[1]}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.changesToPrivacyPolicy.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.changesToPrivacyPolicy.content}
              </p>
            </div>
            <div
              className={`item mb-12 sm:ml-10" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              <h3 className="title mb-6 font-bold text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.contactUs.title}
              </h3>
              <p className="text font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]">
                {texts.contactUs.content}
                <a
                  className="underline text-[#2196F3]"
                  href="mailto:HI@GHMZA.COM"
                >
                  hi@ghmza.com
                </a>
              </p>
            </div>
            <p
              className={`text md:ml-10 font-normal text-[18px] md:text-[22px] leading-7 tracking-[0.1px] md:tracking-[-0.28px]" ${
                language === "ENG" ? "font-custom1" : "font-custom3"
              }`}
            >
              {texts.effectiveDate}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default PrivacyPolicy;
