import Image from "next/image";
import React, { useState } from "react";

const dropdownList = [
  {
    title: "youtube",
    icon: "/images/youtube-icon.png",
  },
];

const Dropdown = () => {
  const [show, setShow] = useState(true);
  const [listTitle, setListTitle] = useState("LISTEN NOW");

  return (
    <>
      <div className=" relative mt-[15px] ">
        <div
          onClick={() => {
            setShow(!show);
          }}
          className="w-full md:w-[380px] h-[64px] border-[1px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer "
        >
          <span>{listTitle}</span>
          <div className="h-[18px] w-[18px]  relative">
            <Image src="./images/dropdown-icon.png" alt="" className="" fill />
          </div>
        </div>
        <div
          className={`absolute w-full top-[65px] z-[50] bg-white ${
            show ? "hidden" : "block"
          }`}
        >
          {dropdownList?.map((list, index) => (
            <div
              onClick={() => {
                setListTitle(list.title);
                setShow(true);
              }}
              key={index}
              className="  border-[1px] border-t-0 w-full md:w-[380px] h-[64px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer "
            >
              <span className="uppercase">{list.title}</span>
              <div className="h-[18px] w-[18px]  relative">
                <Image src={list.icon} fill alt="" className="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
