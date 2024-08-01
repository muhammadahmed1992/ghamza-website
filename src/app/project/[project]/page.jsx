"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { BsEnvelope } from "react-icons/bs";
import Dropdown from "@/components/dropdownProject/Dropdown";
import "./style.css";
import { usePathname, useSearchParams } from "next/navigation";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import utils from "@/util/utils";
import ProgressiveImage from "react-progressive-graceful-image";
import { toggleModal } from "@/redux/modalSlice";
import NavBarDetails from "@/components/NavBarDetails/NavBarDetails";
import { useRouter } from "next/navigation";

export const DropdownNew = (props) => {
  console.log(props);
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
    },
    {
      title: selectedLanguage === "ENG" ? "A-Z" : "من الألف إلى الياء",
    },
  ];

  return (
    <>
      <div className="bg-[#ffffff] relative mt-[26px] md:px-[18px] ">
        <div
          className={` w-[100%] md:w-[280px] h-[64px] border-[1px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer `}
          onClick={() => {
            setShow(!show);
          }}
        >
          <span
            className={`${
              selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
            } font-[400]  text-[12.39px] uppercase leading-[14.79px] tracking-[0.06px]`}
          >
            {/* {listTitle} */}
            {selectedLanguage === "ENG" ? "Watch Now" : "شاهد الآن"}
          </span>
          <div className="relative h-[18px] w-[18px] ">
            <Image src="/images/dropdown-icon.png" alt="" fill />
          </div>
        </div>
        <div
          className={`bg-[#ffffff] z-10  w-[100%] md:w-[280px] top-[65px] ${
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
                className={`${
                  selectedLanguage === "ENG" ? "font-custom1 " : "font-custom3"
                } bg-[#ffffff]  border-[1px]  w-[100%]  md:w-[280px] h-[64px] border-[#000000] border-t-[0px] flex px-[29px] justify-between items-center cursor-pointer `}
              >
                <span className="font-[400] uppercase  text-[12.39px] leading-[14.79px] tracking-[0.06px]">
                  {list.name}
                </span>
                <div className="relative h-[25px] w-[25px]">
                  <Image src={`/images/${list?.name}.svg`} alt="" fill />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const ProjectExpansion = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const apiVar = searchParams.get("select");
  const status = searchParams.get("status");
  const [ticket, setTicket] = useState(null);
  const [descriptionImg, setDescriptionImg] = useState(null);
  const [descriptionVideo, setDescriptionVideo] = useState(null);
  const [data, setData] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState();
  const [isSlidingOut, setIsSlidingOut] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const handleToggleModal = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    if (data) {
      setModalVideo(extractVideoId(data.attributes?.videoURL));
      data.attributes.media.data?.forEach((media) => {
        if (
          media?.attributes?.ext === ".jpg" ||
          media?.attributes?.ext === ".jpeg" ||
          media?.attributes?.ext === ".png" ||
          media?.attributes?.ext === ".webp"
        ) {
          setDescriptionImg(media.attributes?.url);
        } else if (media.attributes?.ext === ".mp4") {
          setDescriptionVideo(media.attributes?.url);
        }
      });
      setTicket(data.attributes?.ticket !== null);
    }
  }, [data]);

  useEffect(() => {
    const getFilm = async () => {
      try {
        const response = await fetch(
          `${utils.BASE_URL}${apiVar}?locale=${lang}&populate=*&filters[uniqueID][$eq]=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${utils.token}`,
            },
          }
        );
        const result = await response.json();
        console.log("res is", result);

        if (result.data && result.data.length > 0) {
          const filmData = result.data[0];
          setData(filmData);
          document.title = `${filmData?.attributes?.name.toUpperCase()} | GHMZA`;
        } else {
          router.push("/not-found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFilm();
  }, [lang, selectedLanguage]);

  useEffect(() => {
    if (selectedLanguage === "ENG") {
      setLang("en");
    } else {
      setLang("ar");
    }
  }, [selectedLanguage]);

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const whatsappUrl = `https://wa.me/?text=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
  const emailUrl = `mailto:?subject=GHMZA&body=${encodedUrl}`;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Initial dimensions
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const accordionItems = [
    {
      title: selectedLanguage === "ENG" ? "SYNOPSIS" : "ملخص",
      content: (
        <>
          <p
            className={`mb-2 font-normal  lg:text-[27px] text-[22px] leading-[35.91px] tracking-[-0.34px] ${
              selectedLanguage === "ENG"
                ? "lg:ml-[0px]  ml-[-8px]"
                : "lg:mr-[0px]  mr-[-8px]"
            }`}
          >
            {data?.attributes?.synopsis}
          </p>
        </>
      ),
    },
    {
      title: selectedLanguage === "ENG" ? "POSTERS" : "الملصقات",

      content:
        descriptionImg !== null ? (
          <>
            <div className=" relative h-[554] w-[354]">
              <Image fill src={descriptionImg} />
            </div>
          </>
        ) : null,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [dir, setDir] = useState(selectedLanguage === "ENG" ? "ltr" : "rtl");
  const [language, setLanguage] = useState(selectedLanguage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDir(selectedLanguage === "ENG" ? "ltr" : "rtl");
      setLanguage(selectedLanguage);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  return (
    <>
      {isSlidingOut && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-out-top`}
        ></div>
      )}

      <div
        dir={dir}
        className={`${language === "ENG" ? "font-custom1" : "font-custom3"}`}
      >
        <NavBarDetails />

        <div className="parentCoverWrapper h-[100vh] relative flex flex-col ">
          <ProgressiveImage
            delay={1500}
            src={data?.attributes?.banner?.data?.attributes?.url}
          >
            {(src, loading) => (
              <div className="relative w-full h-[100%]">
                <Image
                  src={src}
                  className={`image${
                    loading ? " loading" : " loaded"
                  } object-cover  `}
                  alt="sea beach"
                  fill
                />
              </div>
            )}
          </ProgressiveImage>
          {data?.attributes?.videoURL !== null ? (
            <svg
              id="playBtn"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              width="48"
              height="64"
              viewBox="0 0 48 64"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleToggleModal}
            >
              <path
                d="M45.3579 32.1429L1.13379 2.66016V61.6257L45.3579 32.1429Z"
                strokeWidth={2.2}
              />
            </svg>
          ) : (
            ""
          )}

          <div
            className={`mb-4 ${
              language === "ENG"
                ? "bottom-1 absolute left-4"
                : "bottom-1 absolute right-4 "
            } flex flex-col md:flex-row justify-center items-start`}
          >
            <p className="capitalize text-[50px] md:text-[90px] font-[510]  text-white flex items-center tracking-[-3.29px] xl:tracking-[-3.49px]  ">
              {data?.attributes?.name}
            </p>
            {/* <sup className=" -top-6 md:top-5 text-white text-[13px] tracking-[-0.42px] ml-[10px] leading-[9.73px] mt-[30px]">
              {new Date(data?.attributes?.releaseDate).getFullYear()}
            </sup> */}
          </div>
        </div>

        {screenWidth <= 768 ? (
          <div className="border-black border-b-[1px] px-[17px] w-full my-[24px]">
            {status === "all" ? (
              <div
                className={`lg:mr-[100px] md:mr-[25px] xl:mr-[200px] flex flex-col items-start w-full `}
              >
                <div className="flex flex-col justify-start w-full ">
                  {data?.attributes?.ticket !== null ? (
                    <div className="flex items-center ">
                      <Image
                        alt="arrow-right-img"
                        className="mr-[5px]"
                        src={"/images/arrow-top-right.svg"}
                        width={19}
                        height={19}
                      />

                      <a
                        href={data?.attributes?.ticket}
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Recommended for security reasons
                      >
                        <p className="hover:border-black hover:border-b-[1px]   font-[400] text-[13.24px] leading-[25px] tracking-[-0.08px] text-black  m-0  lg:font-[400] lg:text-[13.59px] lg:leading-[25px] lg:tracking-[-0.08px]">
                          {selectedLanguage === "ENG"
                            ? "GET TICKETS"
                            : "احصل على التذاكر"}
                        </p>
                      </a>
                    </div>
                  ) : (
                    ""
                  )}

                  {data?.attributes?.platform?.platforms.length > 0 ? (
                    <div className="">
                      {/* <Dropdown platforms={data?.attributes?.platform} /> */}
                      <DropdownNew platforms={data?.attributes?.platform} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div className="md:h-[150px] md:w-[150px]"></div>
            )}
            {data?.attributes?.releaseDate !== null ? (
              <>
                {" "}
                <div className="mt-[20px]">
                  <p className=" text-[12.1px] leading-[25px]  text-gray mb-[10px] tracking-[0.06px]">
                    {language === "ENG" ? "RELEASE DATE" : "من كتابة وإخراج"}
                  </p>
                </div>
                <div>
                  <p className=" font-[600] text-[24px] leading-[24px] mb-[20px] text-black">
                    {new Date(data?.attributes?.releaseDate).getFullYear()}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
            {data?.attributes?.directedBy !== null ? (
              <>
                {" "}
                <div className="mt-[20px]">
                  <p className=" text-[12.1px] leading-[25px]  text-gray mb-[10px] tracking-[0.06px]">
                    {selectedLanguage === "ENG"
                      ? "WRITTEN AND DIRECTED BY"
                      : "من كتابة وإخراج"}
                  </p>
                </div>
                <div>
                  <p className=" font-[600] text-[24px] leading-[24px]  text-black">
                    {data?.attributes?.directedBy}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
            {data?.attributes?.cast !== null ? (
              <>
                {" "}
                <div className="mt-[36px]">
                  <p className=" text-[12.1px] leading-[25px]  text-gray tracking-[0.06px]">
                    {selectedLanguage === "ENG" ? "STARRING" : "بطولة"}
                  </p>
                </div>
                <div className="mb-[38px]">
                  {data?.attributes?.cast?.map((actor, index) => (
                    <p
                      key={index}
                      className="font-[600] text-[24px] leading-[24px] text-black mt-[10px] tracking-[0.6px]"
                    >
                      {actor?.trim()}
                      <br />
                    </p>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="flex items-start justify-between gap-10 w-full px-[90px] my-[90px] bg-white">
            <div className="">
              <p className=" font-[400] text-[10px] leading-[25px] tracking-[0.08px] text-gray m-0 mb-[10px] 2xl:text-[14.1px] lg:leading-[25px] lg:tracking-[0.08px]">
                {language === "ENG" ? "RELEASE YEAR" : "العام القادم"}
              </p>
              <p className=" font-[500] text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]">
                {new Date(data?.attributes?.releaseDate).getFullYear()}
              </p>
            </div>

            <div className="flex flex-col justify-center items-start w-full md:max-w-3xl">
              <p className=" font-[400] text-[10px] leading-[25px] tracking-[0.08px] text-gray m-0 mb-[10px] 2xl:text-[14.1px] lg:leading-[25px] lg:tracking-[0.08px]">
                {language === "ENG" ? "SYNOPSIS" : "ملخص"}
              </p>
              <p
                className={`m-0 font-[400] text-[21px] 2xl:text-[27px] ${
                  selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
                } leading-[35.9px] md:leading-[1.13] tracking-[-0.34px] md:tracking-[-0.0125em] text-black`}
              >
                {data?.attributes?.synopsis}
              </p>

              <div className="flex justify-start items-center gap-[15px] mt-[20px] font-[400] tracking-[0.08px] text-[14.4px]">
                <p className="mb-[15px]">
                  {language === "ENG" ? "SHARE" : "مشاركة"}
                </p>
                <div className="flex justify-between gap-3 mb-[15px]">
                  <a href={whatsappUrl} target="_blank">
                    <BsWhatsapp className="h-[20px] w-[20px]" />
                  </a>
                  <a href={twitterUrl} target="_blank">
                    <FaXTwitter className="h-[20px] w-[20px]" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full max-w-sm">
              {status === "all" ? (
                <div
                  className={`flex flex-col justify-start items-start md:h-[150px] `}
                >
                  {data?.attributes?.ticket !== null ? (
                    <div className="flex flex-col lg:mr-[100px] md:mr-[25px] xl:mr-[200px] items-start justify-start h-[40px]">
                      <div className="flex items-center mb-2">
                        <Image
                          alt="arrow-right-img"
                          className="mr-[5px]"
                          src={"/images/arrow-top-right.svg"}
                          width={19}
                          height={19}
                        />
                        <a
                          href={data?.attributes?.ticket}
                          target="_blank" // Opens the link in a new tab
                          rel="noopener noreferrer" // Recommended for security reasons
                        >
                          <p className="hover:border-black hover:border-b-[1px] font-[400] text-[13.24px] leading-[25px] tracking-[-0.08px] text-black  m-0  lg:font-[400] lg:text-[13.59px] lg:leading-[25px] lg:tracking-[-0.08px]">
                            {selectedLanguage === "ENG"
                              ? "GET TICKETS"
                              : "احصل على التذاكر"}
                          </p>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {data?.attributes?.platform?.platforms.length > 0 && (
                        <div className="flex flex-col items-start justify-start h-[40px]">
                          <div className="flex items-center mb-2">
                            <Image
                              alt="arrow-right-img"
                              className="mr-[5px]"
                              src={"/images/arrow-top-right.svg"}
                              width={19}
                              height={19}
                            />
                            <a
                              href={data?.attributes?.ticket}
                              target="_blank" // Opens the link in a new tab
                              rel="noopener noreferrer" // Recommended for security reasons
                            >
                              <p className="hover:border-black hover:border-b-[1px] font-[400] text-[13.24px] leading-[25px] tracking-[-0.08px] text-black  m-0  lg:font-[400] lg:text-[13.59px] lg:leading-[25px] lg:tracking-[-0.08px]">
                                {selectedLanguage === "ENG"
                                  ? "ON PLATFORMS"
                                  : "على المنصات"}
                              </p>
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  {data?.attributes?.platform?.platforms.length > 0 ? (
                    <Dropdown platforms={data?.attributes?.platform} />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className=" lg:mr-[100px] md:mr-[25px] xl:mr-[200px] flex flex-col justify-start items-start  ">
                  {data?.attributes?.ticket !== null ? (
                    <div className="flex flex-col items-start justify-start h-[40px]">
                      <div className="flex">
                        <Image
                          alt="arrow-right-img"
                          className="mr-[5px]"
                          src={"/images/arrow-top-right.svg"}
                          width={19}
                          height={19}
                        />
                        <a
                          href={data?.attributes?.ticket}
                          target="_blank" // Opens the link in a new tab
                          rel="noopener noreferrer" // Recommended for security reasons
                        >
                          <p className="hover:border-black hover:border-b-[1px]   font-[400] text-[13.24px] leading-[25px] tracking-[-0.08px] text-black  m-0  lg:font-[400] lg:text-[13.59px] lg:leading-[25px] lg:tracking-[-0.08px]">
                            {selectedLanguage === "ENG"
                              ? "GET TICKETS"
                              : "احصل على التذاكر"}
                          </p>
                        </a>
                      </div>
                      {/* <Dropdown platforms={data?.attributes?.platform} /> */}
                    </div>
                  ) : (
                    <>
                      {data?.attributes?.platform?.platforms.length > 0 && (
                        <div className="flex flex-col items-start justify-start h-[40px]">
                          <div className="flex">
                            <Image
                              alt="arrow-right-img"
                              className="mr-[5px]"
                              src={"/images/arrow-top-right.svg"}
                              width={19}
                              height={19}
                            />
                            <a
                              href={data?.attributes?.ticket}
                              target="_blank" // Opens the link in a new tab
                              rel="noopener noreferrer" // Recommended for security reasons
                            >
                              <p className="hover:border-black hover:border-b-[1px]   font-[400] text-[13.24px] leading-[25px] tracking-[-0.08px] text-black  m-0  lg:font-[400] lg:text-[13.59px] lg:leading-[25px] lg:tracking-[-0.08px]">
                                {selectedLanguage === "ENG"
                                  ? "ON PLATFORMS"
                                  : "على المنصات"}
                              </p>
                            </a>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {screenWidth <= 768 ? (
          <div id="accordion-collapse" data-accordion="collapse" className="">
            {accordionItems?.map((item, index) => (
              <div key={index} className="mb-6">
                {item?.content !== null ? (
                  <>
                    {" "}
                    <h2>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500   rounded-t-xl  hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={activeIndex === index ? "true" : "false"}
                        aria-controls={`accordion-collapse-body-${index}`}
                      >
                        <span className="font-[400] text-[13.49px] leading-[14.91px] tracking-[0.06px]">
                          {item.title}
                        </span>
                        <svg
                          className={`w-3 h-3 rotate-${
                            activeIndex === index ? "0" : "180"
                          } shrink-0`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id={`accordion-collapse-body-${index}`}
                      className={`p-2  ${
                        activeIndex === index ? "border-b-[1px] " : ""
                      }  ${activeIndex === index ? "" : " hidden"}`}
                      aria-labelledby={`accordion-collapse-heading-${index}`}
                    >
                      <div className="m-[20px]  font-[400] text-[22px] leading-[36px] tracking-[-0.3px]">
                        {item.content}
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {screenWidth <= 768 ? (
          <>
            {descriptionImg !== null ? (
              <div className=" flex flex-col justify-center items-center mb-[20px] mt-[31px] border-black border-b-[1px] mx-[12px]">
                <div className="relative h-full w-full">
                  <video
                    ref={videoRef}
                    controls
                    src={descriptionVideo}
                    type="video/mp4"
                    poster={descriptionImg}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onClick={handleVideoPlay}
                    onPlay={handleVideoPlay}
                  />
                  {!isPlaying && (
                    <svg
                      id="playBtn"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      width="48"
                      height="64"
                      viewBox="0 0 48 64"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handlePlayClick}
                    >
                      <path
                        d="M45.3579 32.1429L1.13379 2.66016V61.6257L45.3579 32.1429Z"
                        strokeWidth={2.2}
                      />
                    </svg>
                  )}
                </div>
                {/* <Image
              alt="play-btn-img"
              src="/images/play-icon.svg"
              height={29}
              width={20}
              className="cursor-pointer absolute top-[45%] left-[45%]"
            /> */}
                <p className="uppercase font-[400] text-[12px] leading-[15.96px] tracking-[-0.15px] mt-[9px]">
                  {data?.attributes?.caption}
                </p>
                {data?.attributes?.subtitle ? (
                  <p className="uppercase text-center text-balance font-[860] text-[54px] w-full leading-[70px] tracking-[-2.97px] mt-0">
                    {data?.attributes?.subtitle}
                  </p>
                ) : (
                  ""
                )}
                <p
                  className=" font-[400] text-[14px] text-left
             leading-[15.96px] tracking-[-0.15px] m-0"
                >
                  {data?.attributes?.promoText}
                </p>
                <div className="flex justify-evenly items-center gap-[15px] mt-[15px] mb-[20px]">
                  <p className="font-custom text-[14.4px] font-[400] leading-[25px] tracking-[0.08px] m-auto h-6">
                    SHARE
                  </p>
                  <div className="flex justify-between gap-3 ">
                    <BsWhatsapp className="h-[20px] w-[20px]" />
                    <FaXTwitter className="h-[20px] w-[20px]" />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>

      {isModalOpen && (
        <button
          className="absolute top-0 right-0 m-4 text-white text-3xl z-50"
          onClick={handleToggleModal}
        >
          &times;
        </button>
      )}
      <style jsx global>{`
        body.modal-open {
          overflow: hidden;
        }
      `}</style>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={isModalOpen}
        contentLabel="Play Video"
        className="fixed top-0 inset-0 bg-black bg-opacity-90 p-4 flex justify-center items-center"
        htmlOpenClassName="modal-open"
      >
        <div className="relative w-full max-w-3xl max-h-screen overflow-hidden bg-white rounded-lg">
          <div className="flex justify-center items-center w-full h-[30vh] sm:h-[60vh] relative">
            <iframe
              src={`https://www.youtube.com/embed/${modalVideo}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Function to extract video ID from YouTube URL
function extractVideoId(url) {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let match;
  while ((match = regex.exec(url)) !== null) {
    if (match[1] === "v") {
      return match[2];
    }
  }
  return null;
}

export default ProjectExpansion;
