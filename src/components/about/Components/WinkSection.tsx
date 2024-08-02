import React, { forwardRef } from "react";
import Image from "next/image";
import { circle, logo, wink } from "../../../../public/images/about_assets";

const WinkSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      id="winkSection"
      ref={ref}
      className="hidden md:block max-w-[1215.54px] mx-5 xl:mx-auto mt-10 lg:mt-[100px] mb-10 lg:mb-[120px] border-[0.5px] border-[#1D1E1C] "
    >
      <div className="flex border-b-[0.5px] border-[#1D1E1C]">
        <div className="w-[25%] flex justify-center items-center">
          <Image className="w-[32px] h-[25px]  lg:w-[107px] lg:h-[86px]" src={logo} alt="image logo" />
        </div>
        <div className="border-x-[0.5px] border-[#1D1E1C] w-[3%]"></div>
        <div className="w-[69%] ">
          <div className="w-[90%] mx-auto py-5 lg:py-[60px]">
            <Image className="ml-[18px] lg:ml-[60px] lg:w-auto w-12  lg:h-auto" src={wink} alt="wink" />
            <p className="text-[3.59px] leading-[4.28px] font-medium md:text-lg italic mt-8">verb</p>
            <p className="text-[3.59px] leading-[4.28px] lg:text-[18px] lg:leading-6 font-[500] ml-[12px] mt-[16px]">
              1. close and open one eye quickly, typically to indicate that something is a joke or a secret or
              as signal of affection or greeting."he winked at Nicole as he passed"
            </p>
            <p className="text-[3.59px] leading-[4.28px] lg:text-[18px] lg:leading-6 font-[500] ml-[12px] mt-4 lg:mt-[80px]">
              2. (of a bright object or a light) or flash intermittently. <br /> "the diamond on her finger
              winked in the moonlight"
            </p>
          </div>
          <div className="relative">
            <div className="w-full bg-[#1D1E1C] h-[0.5px] !absolute"></div>
          </div>
          <div className="w-[90%] mx-auto py-5 lg:py-[60px]">
            <p className="text-[3.59px] leading-[4.28px] font-medium  md:text-lg italic lg:mt-8">noun</p>
            <p className="text-[3.59px] leading-[4.28px] lg:text-[18px] lg:leading-6 font-[400] ml-[20px] lg:ml-[40px] mt-[10px] lg:mt-[35px]">
              an act of winking.
            </p>
            <p className="text-[3.59px] leading-[4.28px] lg:text-[18px] lg:leading-6 font-[400] ml-[20px] lg:ml-[40px] mt-[10px]">
              "Barney gave him a knowing wink"
            </p>
          </div>
        </div>
        <div className="w-[3%] border-l-[0.5px] border-[#1D1E1C]"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-[28%] border-r-[0.5px] border-[#1D1E1C] h-[34.5px]"></div>
        <div className="w-[3.04%] border-l-[0.5px] border-[#1D1E1C] h-[34.5px]">
          <Image className="h-full w-full hidden lg:block" src={circle} alt="" />
        </div>
      </div>
    </div>
  );
});

WinkSection.displayName = "WinkSection";

export default WinkSection;
