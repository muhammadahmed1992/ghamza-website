"use client";
import { usePathname } from "next/navigation";
import "./style.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const SkrollrComponent = dynamic(
  () =>
    import("skrollr").then((mod) => {
      const skrollr = mod.default;
      const SkrollrComponentWithDisplayName = ({ children }) => {
        useEffect(() => {
          if (typeof window !== "undefined") {
            const s = skrollr.init();
            return () => {
              if (s) s.destroy();
            };
          }
        }, []);

        return <div>{children}</div>;
      };

      SkrollrComponentWithDisplayName.displayName = "SkrollrComponent";
      return SkrollrComponentWithDisplayName;
    }),
  { ssr: false }
);

const NewApp = () => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const pathname = usePathname();
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const rotateX = (clientY / innerHeight - 0.5) * 10; // Adjust the tilt intensity as needed
    const rotateY = (clientX / innerWidth - 0.5) * 10; // Adjust the tilt intensity as needed

    document.getElementById(
      "image"
    ).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    document.getElementById("image").style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const [isScrolling, setIsScrolling] = useState(false); // Initial state: false

  const [scrollValue, setScrollValue] = useState(0); // State for scroll position

  const handleScroll = () => {
    setIsScrolling(true);
    setScrollValue(window.pageYOffset); // Update scroll value on each scroll event
  };

  useEffect(() => {
    if (scrollValue === 0) {
      setIsScrolling(false);
    }
  }, [scrollValue]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add event listener on component mount

    return () => {
      window.removeEventListener("scroll", handleScroll); // Remove listener on unmount for cleanup
    };
  }, []);

  return (
    <div className="outer-div">
      <SkrollrComponent>
        <div
          id="image"
          data-0="background-size: 250% auto; transform: scale(1);"
          data-500="background-size: 100% auto; transform: scale(0.8);"
          className={`z-[40] app_page_ ${
            selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
          }`}
          style={{ height: "100vh", overflow: "hidden" }} // Ensure height is 100vh and no overflow
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h1
            data-0=""
            data-500=" transform: scale(0.8);"
            className={` ${
              isScrolling ? "transition-all text-white " : " text-black "
            } transition-all cursor-default select-none   flex h-screen text_animation text-center leading-[50px] md:leading-[100px] xl:leading-[142px] lg:tracking-[-7.73px] md:max-w-[600px] xl:max-w-[880px] text-[50px] md:text-[100px] xl:text-[160px] font-[860] justify-center items-center mt-[-20px]`}
          >
            WE CAN&apos;T TELL YOU YET
          </h1>
        </div>
      </SkrollrComponent>
      <div
        id="stopScroll"
        className={`z-[-4] bottom-0  ${
          isScrolling ? "bg-[#DF1780] transition-all " : "bg-[white]"
        }   fixed transition-all duration-700 top=[115px]  inset-0 object-cover`}
      ></div>
    </div>
  );
};

export default NewApp;
