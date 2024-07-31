"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchResultsItem = ({ index, name, thumbnailImg, item, category }) => {
  const [imageWidth, setImageWidth] = useState(0);
  const [showMobileScreen, setShowMobileScreen] = useState(false);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const handleAnimationClick = () => {
    setIsSlidingOut((prevState) => !prevState);
    dispatch(toggleModal(false));
  };

  const makeSingular = (category) => {
    if (selectedLanguage === "ENG"){
      if (category.endsWith("s")) {
        if (category == "Docus") {
          return category;
        }
        return category.slice(0, -1);
      }
    }
    return category;
  };

  const displayCategory = makeSingular(category);

  useEffect(() => {
    const handleResize = () => {
      setImageWidth(window.innerWidth / 2.1);
      setShowMobileScreen(window.innerWidth < 640);
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const currentDate = getCurrentDateFormatted();

  const isEven = index % 2 === 0;

  return (
    <>
      {isSlidingOut && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-out-bottom`}
        />
      )}

      {showMobileScreen !== true ? (
           <Link
           href={{
             pathname: `${
               item?.attributes?.category?.data?.attributes?.type ===
               "musics"
                 ? `/music`
                 : `/project/${item?.attributes?.category?.data?.attributes?.type}`
             }`,

             query: {
               id: item?.attributes?.uniqueID,
               select: item?.attributes?.category?.data?.attributes?.type,
               status: `${
                 item.attributes?.releaseDate > currentDate
                   ? "upcoming"
                   : "all"
               }`,
             },
           }}
           onClick={handleAnimationClick}
         >
        <div
          className={`flex justify-between ${
            isEven ? "flex-row gap-[56px]" : "flex-row-reverse gap-[56px]"
          } my-[40px]  sm:mt-[82px] sm:mb-[100px]  w-full`}
          style={{ height: imageWidth / 1.8 + "px" }}
        >
          <div
            className={`flex gap-[20px] ${
              isEven ? "flex-[1]" : "flex-[1] w-full"
            } flex-col justify-between`}
          >
            <div className={`${isEven ? "" : "ml-[15px]"}`}>
              <p
                className={`${
                  selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
                }text-[15px] leading-[0.92] tracking-[-0.04em] mb-[10px] uppercase text-[#888888]`}
              >
                {displayCategory}
              </p>
                <p
                  className={`${
                    selectedLanguage === "ENG"
                      ? "font-custom1 "
                      : "font-custom3"
                  } cursor-pointer font-[600] tracking-[-0.04em] font-custom1 w-fit text-[40px] lg:text-[50px] xl:text-[57px] 2xl:text-[71px] leading-[41px] md:leading-none`}
                >
                  {name}
                </p>
            </div>
            <div className="flex items-center group">
              <svg
                className="sm:w-[60px] sm:h-[20px] md:w-[60px] md:h-[20px] mr-[33px] transition-all duration-500 ease-in-out group-hover:w-[40px] h-[30px] "
                width="104"
                height="30"
                viewBox="0 0 104 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.16406 18.2855C1.6325 18.2855 0.390931 19.527 0.390931 21.0586C0.390931 22.5902 1.6325 23.8317 3.16406 23.8317L3.16406 18.2855ZM103.109 23.0195C104.192 21.9365 104.192 20.1807 103.109 19.0977L85.4608 1.4496C84.3779 0.366624 82.622 0.366624 81.539 1.4496C80.4561 2.53257 80.4561 4.28842 81.539 5.3714L97.2262 21.0586L81.539 36.7458C80.4561 37.8288 80.4561 39.5846 81.539 40.6676C82.622 41.7506 84.3779 41.7506 85.4608 40.6676L103.109 23.0195ZM3.16406 23.8317L101.148 23.8317L101.148 18.2855L3.16406 18.2855L3.16406 23.8317Z"
                  fill="black"
                />
              </svg>
              <p
                className={`${
                  selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
                } sm:text-[21px] text-[14px] leading-[0.3] tracking-[-0.04em] font-[500] my-[10px] text-[black] transition-transform duration-500 ease-in-out group-hover:scale-105 `}
              >
                {selectedLanguage === "ENG" ? "SEE MORE" : "شاهد المزيد"}
              </p>
            </div>
      
          </div>
            <div
              className={` ${
                isEven ? "flex-[1]" : "flex-[1]"
              }   overflow-hidden`}
            >
              <Image
                style={{
                  width: `${imageWidth}px`,
                  height: `${imageWidth / 1.8}px`,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                width={100}
                height={100}
                className="transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
                src={thumbnailImg}
                alt={name}
              />
            </div>
        </div>
          </Link>
      ) : (
            <Link
              href={{
                pathname: `${
                  item?.attributes?.category?.data?.attributes?.type ===
                  "musics"
                    ? `/music`
                    : `/project/${item?.attributes?.category?.data?.attributes?.type}`
                }`,

                query: {
                  id: item?.attributes?.uniqueID,
                  select: item?.attributes?.category?.data?.attributes?.type,
                  status: `${
                    item.attributes?.releaseDate > currentDate
                      ? "upcoming"
                      : "all"
                  }`,
                },
              }}
              onClick={handleAnimationClick}
            >
        <div className="flex flex-col">
          <div className="my-[24px] pb-[25px] border-b border-black">
            <p className="text-[13px] leading-[0.92] tracking-[-0.04em] my-[10px] uppercase text-[#888888]">
              {displayCategory}
            </p>
              <Image
                src={thumbnailImg}
                alt={name}
                width={200}
                height={200}
                style={{ width: "100%", height: "200px" }}
              />
              <p className="capitalize text-[40px] font-[700] tracking-[-1.92px] leading-[44px] mt-[9.6px]">
                {name}
              </p>
      

            <div className="flex items-center my-[24px] cursor-pointer">
              <svg
                className="sm:w-[60px] sm:h-[20px] md:w-[60px] md:h-[20px] mr-[33px] transition-all duration-500 ease-in-out group-hover:w-[40px] h-[30px] "
                width="50"
                height="30"
                viewBox="0 0 104 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.16406 18.2855C1.6325 18.2855 0.390931 19.527 0.390931 21.0586C0.390931 22.5902 1.6325 23.8317 3.16406 23.8317L3.16406 18.2855ZM103.109 23.0195C104.192 21.9365 104.192 20.1807 103.109 19.0977L85.4608 1.4496C84.3779 0.366624 82.622 0.366624 81.539 1.4496C80.4561 2.53257 80.4561 4.28842 81.539 5.3714L97.2262 21.0586L81.539 36.7458C80.4561 37.8288 80.4561 39.5846 81.539 40.6676C82.622 41.7506 84.3779 41.7506 85.4608 40.6676L103.109 23.0195ZM3.16406 23.8317L101.148 23.8317L101.148 18.2855L3.16406 18.2855L3.16406 23.8317Z"
                  fill="black"
                />
              </svg>
              <p className=" text-[21px] leading-[0.3] tracking-[-0.04em] font-[500] my-[10px] text-[black] transition-transform duration-500 ease-in-out group-hover:scale-105">
                SEE MORE
              </p>
            </div>
          </div>
        </div>
            </Link>
      )}
    </>
  );
};

export default SearchResultsItem;
