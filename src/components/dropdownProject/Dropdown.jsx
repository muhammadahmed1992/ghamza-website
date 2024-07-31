import React, { useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";

const Dropdown = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [show, setShow] = useState(true);
  const [listTitle, setListTitle] = useState("WATCH NOW");

  return (
    <>
      <div
        dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
        className="relative w-full "
      >
        <div
          id="dropDown"
          onClick={() => {
            setShow(!show);
          }}
          className="w-full h-[64px] border-[1px] border-[#000000] uppercase flex px-[29px] mt-2 justify-between items-center cursor-pointer"
        >
          <span>{selectedLanguage === "ENG" ? "Watch Now" : "شاهد الآن"}</span>
          <img
            src="/images/dropdown-icon.png"
            alt=""
            className={`h-[18px] w-[18px] ${
              show ? "transform rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`absolute w-full top-[72px]  z-[50]  ${
            show ? "hidden" : "block"
          }`}
        >
          {props?.platforms?.platforms?.map((list, index) => (
            <a
              key={index}
              href={list?.url}
              target="_blank" // Opens the link in a new tab
              rel="noopener noreferrer" // Recommended for security reasons
            >
              <div
                onClick={() => {
                  setShow(true);
                }}
                key={index}
                className="border-[1px] border-t-0 w-full h-[62px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer z-50 bg-white"
              >
                <span className="uppercase hover:border-b-[1px]  font-custom1 font-[400] text-[14.3px] leading-[17px] tracking-[0.08px]">
                  {list?.name}
                </span>
                <img
                  src={`/images/${list?.name}.svg`}
                  alt=""
                  className="h-[25px] w-[25px]"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
