import { list } from "postcss";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Dropdown = ({ handleNewestClick, handleAZClick }) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [show, setShow] = useState(true);
  const [listTitle, setListTitle] = useState(
    selectedLanguage === "ENG" ? "SORT BY: " : "ترتيب حسب"
  );
  const [listIcon, setListIcon] = useState("");
  const dropdownList = [
    {
      title: selectedLanguage === "ENG" ? "NEWEST" : "الأحدث",
      action: handleNewestClick,
    },
    {
      title: selectedLanguage === "ENG" ? "A-Z" : "من الألف إلى الياء",
      action: handleAZClick,
    },
  ];

  return (
    <>
      <div className="bg-[#ffffff] relative mt-[26px] px-[18px] ">
        <div
          className={` w-[100%] md:w-[280px] h-[64px] border-[1px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer `}
          onClick={() => {
            setShow(!show);
          }}
        >
          <span
            className={`${
              selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
            } font-[400]  text-[12.39px] leading-[14.79px] tracking-[0.06px]`}
          >
            {selectedLanguage === "ENG" ? "SORT BY: " : "ترتيب حسب"}
          </span>
          <img
            src="/images/dropdown-icon.png"
            alt=""
            className=" h-[18px] w-[18px] "
          />
        </div>
        <div
          className={`bg-[#ffffff] z-10  w-[100%] md:w-[280px] top-[65px] ${
            show ? "hidden" : "block"
          }`}
        >
          {dropdownList?.map((list, index) => (
            <div
              onClick={() => {
                // setListTitle(list.title);
                list.action();
                setShow(true);
              }}
              key={index}
              className={`${
                selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
              } bg-[#ffffff]  border-[1px]  w-[100%]  md:w-[280px] h-[64px] border-[#000000] border-t-[0px] flex px-[29px] justify-between items-center cursor-pointer `}
            >
              <span className="font-[400]  text-[12.39px] leading-[14.79px] tracking-[0.06px]">
                {list.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
