"use client";
import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Link from "next/link";
import "./../components/contact/style.css";
const ImgContainer = styled.div`
  margin-bottom: 82px;
  position: relative;
  width: 300px;
  height: 200px;

  @media (min-width: 480px) {
    width: 300px;
    height: 250px;
  }

  @media (min-width: 640px) {
    width: 450px;
    height: 350px;
  }

  @media (min-width: 768px) {
    width: 400px;
    height: 350px;
  }

  @media (min-width: 1024px) {
    width: 400px;
    height: 350px;
  }

  @media (min-width: 1280px) {
    width: 400px;
    height: 350px;
  }

  @media (min-width: 1440px) {
    width: 450px;
    height: 350px;
  }

  @media (min-width: 1600px) {
    width: 500px;
    height: 350px;
  }

  @media (min-width: 1920px) {
    width: 800px;
    height: 600px;
  }
`;

function NotFound() {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  return (
    <>
      <div
        className={`flex contactContainer flex-col items-center justify-center p-5 mt-[115px] ${
          selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
        }`}
      >
        <div>
          <Image
            src="/images/notFoundImg.webp"
            alt="Not Found Image"
            width={100}
            height={100}
            className=" 3xl:w-[750px] 3xl:h-[550px] 2xl:w-[500px] 2xl:h-[350px] xl:w-[400px] xl:h-[300px] md:w-[400px] md:h-[350px] w-[300px] h-[200px] "
          />
        </div>
        <div className="textContainer text-center">
          <h1 className="text-[33.08px] mb-4 sm:text-[43.73px] md:text-[64.73px] lg:text-[84.73px] xl:text-[104.73px] 2xl:text-[114.73px] 3xl:text-[124.73px] leading-[57.37px] sm:leading-[66.55px] md:leading-[75.73px] lg:leading-[84.91px] xl:leading-[94.09px] 2xl:leading-[103.27px] 3xl:leading-[112.45px] tracking-[0.65px] font-[860] ">
            {selectedLanguage == "ENG" ? (
              <span>NOT FOUND 404</span>
            ) : (
              "الصفحة غير موجودة"
            )}
          </h1>
          <p className="text-[14.87px] sm:text-[26.07px] md:text-[30.07px] lg:text-[38.07px] xl:text-[48.07px] 2xl:text-[52.07px] 3xl:text-[56.07px] leading-[25.79px] sm:leading-[30.03px] md:leading-[34.27px] lg:leading-[38.51px] xl:leading-[42.75px] 2xl:leading-[46.99px] 3xl:leading-[51.23px] tracking-[0.29px] font-normal font-custom1 mb-12">
            {selectedLanguage == "ENG" ? (
              <span>LOOKS LIKE YOU&apos;RE IN THE WRONG PLACE :/</span>
            ) : (
              ""
            )}
          </p>
          <ul
            className={`flex flex-wrap items-center gap-4 justify-center font-[600] uppercase mb-2 2xl:mb-8  ${
              selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
            }`}
          >
            <li>
              <Link href="/"  className="animated-link">
              
                {selectedLanguage === "ENG" ? "Home" : "الرئيسية"}
              </Link>
            </li>
            <li>
              <Link href="/"  className="animated-link">
                {selectedLanguage === "ENG" ? "About Ghmza" : "حول غمزة"}
              </Link>
            </li>
            <li>
              <Link href="/categories/films"  className="animated-link">
                {selectedLanguage === "ENG" ? "Films" : "أفلام"}
              </Link>
            </li>
            <li>
              <Link href="/categories/shows"  className="animated-link">
                {selectedLanguage === "ENG" ? "Shows" : "برامج"}
              </Link>
            </li>
            <li>
              <Link href="/categories/docs"  className="animated-link">
                {selectedLanguage === "ENG" ? "Docus" : "وثائقيات"}
              </Link>
            </li>
            <li>
              <Link href="/categories/music"  className="animated-link">
                {selectedLanguage === "ENG" ? "Music" : "موسيقى"}
              </Link>
            </li>
            <li>
              <Link href="/categories/liveshows"  className="animated-link">
                {selectedLanguage === "ENG" ? "Real Time" : "فعاليات"}
              </Link>
            </li>
            <li>
              <Link href="/categories/contact"  className="animated-link">
                {selectedLanguage === "ENG" ? "Shop" : "تسوق"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NotFound;
