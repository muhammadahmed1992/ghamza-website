"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  return (
    <>
      <div
        className={`border-t-2 border-t-gray border-l-[17px] border-r-[17px] border-pink mb-16
        ${isSearchOpen ? "" : "mt-[73.59px] lg:mt-[108px]"}
        ${selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"}
        `}
      >
        <div className="imgContainer flex items-center justify-center pt-20 pb-36 w-full relative">
          <div className="img p-2">
            <Image
              src="/images/aboutMainImg.png"
              alt="Not Found Image"
              width={1200}
              height={700}
            />
          </div>
          <Image
            src="/images/verticleArrow.svg"
            alt="Not Found Image"
            width={20}
            height={20}
            className="absolute bottom-12 right-24"
          />
        </div>
        <div className="textContainer relative border-t-[1px] border-b-[1px] pb-8 border-black">
          <div className="flex gap-8 border-b-[1px] border-gray">
            <div className="leftBox border-r-[1px] border-gray p-4">
              <Image
                src="/images/aboutImg.svg"
                alt="Not Found Image"
                width={294}
                height={282}
              />
            </div>
            <div className="rightBox border-l-[1px] border-r-[1px] mr-8 border-gray w-full">
              <div className="flex flex-col">
                <div className="firstItem border-b-[1px] border-black">
                  <Image
                    src="/images/aboutTextImg.svg"
                    alt="Not Found Image"
                    width={186.64}
                    height={93.72}
                    className="ml-4 sm:ml-40 mb-8 pt-14"
                  />
                  <div className="ml-4 sm:ml-20 py-4">
                    <p className="font-[500] italic text-[42.67px] leading-[50.92px]">
                      verb
                    </p>
                    <ol className="text-[27px] text-[#1D1E1C] p-4 font-thin">
                      <li className="mb-8">
                        1. close and open one eye quickly, typically to indicate
                        that something is a joke or a secret or as a signal of
                        affectio or greeting,&quot;he winked at Nicole as he
                        passed&quot;
                      </li>
                      <li>
                        2. (of a bright object or a light) shine or flash
                        intermittently.
                        <p>
                          &quot;the diamond on her finger winked in the
                          moonlight&quot;
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className="secondItem border-b-[1px] text-[27px] font-normal border-gray py-4">
                  <p className="ml-4 sm:ml-20 py-4 leading-[32.58px] lowercase">
                    <span className="font-bold">GHMZA</span> IS AN ENTERTAINMENT
                    GROUP FOCUSED ON TALENT DEVELOPMENT AND ORIGINAL MEDIA
                    PRODUCTIONS. <br /> GHMZA TEAM AND PRODUCERS MANAGED AND
                    PRODUCED CONTENT CONSUMED BY OVER
                    <span className="font-bold">
                      {" "}
                      1.5 BILLION VIEWS
                    </span> <br /> AND LISTENS.
                  </p>
                </div>
                <div className="thirdItem flex flex-col sm:flex-row gap-2 sm:items-center justify-end border-gray ml-4 py-12 mr-10">
                  <p className="text-[24.43px] leading-[22.61px] font-[560px] -tracking-[-0.98px]">
                    LIKE US ALREADY? WORK WITH GHMZA
                  </p>
                  <Image
                    src="/images/arrow-right.svg"
                    alt="Not Found Image"
                    width={53}
                    height={100}

                  />
                </div>
              </div>
              <div className="w-[33px] h-[33px] border-t-[1px] border-l-[1px] border-gray absolute bottom-0 right-0">
                <div className="circle w-[33px] h-[33px] border border-gray rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
