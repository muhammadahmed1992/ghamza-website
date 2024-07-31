"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";

export const EyeFollowMouse = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMouseMove = (event) => {
      const eyeElements = document.querySelectorAll(".eye");
      eyeElements.forEach((eye) => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeX = eyeRect.left + eyeRect.width / 2;
        const eyeY = eyeRect.top + eyeRect.height / 2;
        const rad = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
        const rot = (rad * 180) / Math.PI;
        eye.style.transform = `rotate(${rot}deg)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="move-area">
      <div className="secret-container">
        <span className="text">Y</span>
        <div className="eye"></div>
        <div className="eye"></div>
        <span className="text">U</span>
        <div className="mouth">
        <img src="../images/mouth.svg" alt="Mouth" className="svg-mouth"/>
        </div>
      </div>
    </section>
  );
};
const Secret = () => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const images = [
    "./secret/1.png",
    "./secret/2.png",
    "./secret/3.png",
    "./secret/4.png",
    "./secret/5.png",
    "./secret/6.png",
    "./secret/7.png",
    "./secret/8.png",
    "./secret/9.png",
    "./secret/10.png",
    "./secret/11.png",
    "./secret/12.png",
    "./secret/13.png",
    "./secret/14.png",
    "./secret/15.png",
    "./secret/16.png",
    "./secret/17.png",
    "./secret/18.png",
    "./secret/19.png",
    "./secret/20.png",
  ];

  const [currentTime, setCurrentTime] = useState(new Date());
  const [cursorImages, setCursorImages] = useState([]);
  const screenSizeThreshold = 768;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const generateRandomImage = () => {
      setTimeout(() => {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const newImage = {
          src: randomImage,
          x: Math.random() * window?.innerWidth, // Random x position within window width
          y: Math.random() * window?.innerHeight, // Random y position within window height
          id: Date.now(),
        };
        setCursorImages((prevImages) => [...prevImages, newImage]);

        setTimeout(() => {
          setCursorImages((prevImages) =>
            prevImages.filter((img) => img.id !== newImage.id)
          );
        }, 1000);
      }, 500);
    };

    const handleMouseMove = (e) => {
      if (window?.innerWidth < screenSizeThreshold) {
        generateRandomImage();
      } else {
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const newImage = {
          src: randomImage,
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };
        setCursorImages((prevImages) => [...prevImages, newImage]);

        setTimeout(() => {
          setCursorImages((prevImages) =>
            prevImages.filter((img) => img.id !== newImage.id)
          );
        }, 1000);
      }
    };

    var timeoutId;

    window?.addEventListener("mousemove", handleMouseMove);
    if (window?.innerWidth < screenSizeThreshold) {
      timeoutId = setTimeout(generateRandomImage, 120);
    }

    return () => {
      clearTimeout(timeoutId);
      window?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [images, screenSizeThreshold]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${
        selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
      } app_page flex justify-end flex-col items-center mt-[116px] w-full`}
    >
      <div className=" mx-[30px] md:mx-auto flex flex-col  h-screen text-center leading-[70px] lg:leading-[143px] tracking-[-3.73] lg:tracking-[-7.73px] text-[50px] lg:text-[170.05px] font-[860] justify-center items-center max-w-[880px] mt-[-20px]">
        <div className="hidden lg:block  w-full">
          WISH WE COULD
          <span className=" flex items-center justify-center">
            TELL
            <EyeFollowMouse />
          </span>
        </div>
        <div className="flex items-center justify-center w-full block lg:hidden">
          <img className=" w-full" src="../secret/you.svg" alt="" />
        </div>
      </div>

      <div className="w-full  flex flex-col md:flex-row  items-center justify-between gap-[50px] lg:gap-0 pb-[23px] uppercase  lg:pb-[13px] px-[33px]">
        <div className=" hidden md:block w-full lg:w-1/3 text-center md:text-left text-[14px]">
          © 2024 Ghmza{" "}
          <a className="underline" href="mailto:HI@GHMZA.COM">
            HI@GHMZA.COM
          </a>
        </div>
        <div className=" mb-[17%] md:mb-auto w-full lg:w-1/3 text-center text-[14px]">
          MOVE AROUND AND MAYBE YOU&apos;LL KNOW
        </div>
        <div className=" hidden md:block w-full lg:w-1/3 text-center md:text-right text-[14px]">
          KUWAIT
          <div className="mt-[-5px]">
            {selectedLanguage === "AR" ? (
              <>
                {new Intl.DateTimeFormat("ar", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Kuwait",
                }).format(currentTime)}
              </>
            ) : (
              <>
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Kuwait",
                })}
              </>
            )}
          </div>
        </div>
      </div>

      {cursorImages?.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt="Cursor"
          style={{
         
            position: "absolute",
            top: img.y,
            left: img.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: "200px", // Adjust the width as needed
            height: "200px", // Adjust the height as needed
            objectFit: "contain",
          }}
        />
      ))}
    </div>
  );
};

export default Secret;
