"use client";
import Image from "next/image";
import Dropdown from "@/components/dropdown/Dropdown";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { FaTwitter, FaXTwitter } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import utils from "@/util/utils";
import "./Music.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import ProgressiveImage from "react-progressive-graceful-image";
import NavBarDetails from "@/components/NavBarDetails/NavBarDetails";
import { toggleModal } from "@/redux/modalSlice";
export const DropdownNew = (props) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [show, setShow] = useState(true);
  const [listTitle, setListTitle] = useState(
    selectedLanguage === "ENG" ? "SORT BY: " : "ترتيب حسب"
  );
  const [listIcon, setListIcon] = useState("");
  const router = useRouter();
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
          className={
            " w-[100%] md:w-[280px] h-[64px] border-[1px] border-[#000000] flex px-[29px] justify-between items-center cursor-pointer "
          }
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
          <div className="relative h-[18px] w-[18px]">
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
                  <Image
                    src={`/images/${list?.name}.svg`}
                    alt="add somethitng"
                    fill
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const Music = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

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

  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getDaysDifference(releaseDate) {
    const currentDate = getCurrentDateFormatted();

    const currentDateObj = new Date(currentDate);
    const releaseDateObj = new Date(releaseDate);

    // Calculate the time difference in milliseconds
    const timeDifference = currentDateObj - releaseDateObj;

    // Convert the time difference from milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }

  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    // Check if window is defined (i.e., if we're in a browser environment)
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
  const [ticket, setTicket] = useState(null);
  const [descriptionImg, setDescriptionImg] = useState(null);
  const [descriptionVideo, setDescriptionVideo] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");
  const [isFuture, setIsFuture] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(true);
  const [modalVideo, setModalVideo] = useState();
  const [currentUrl, setCurrentUrl] = useState();

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
  useEffect(() => {
    if (data) {
      setCurrentUrl(window.location.href);
      setModalVideo(extractVideoId(data.attributes?.videoURL));
      if (getCurrentDateFormatted() < data?.attributes?.releaseDate) {
        setIsFuture(true);
      } else {
        setIsFuture(false);
      }
      console.log("Future", isFuture);
      data.attributes.media.data?.forEach((media) => {
        if (
          media?.attributes?.ext === ".jpg" ||
          media?.attributes?.ext === ".jpeg" ||
          media?.attributes?.ext === ".png"
        ) {
          setDescriptionImg(media.attributes?.url);
        } else if (media.attributes?.ext === ".mp4") {
          setDescriptionVideo(media.attributes?.url);
        }
      });

      setTicket(data.attributes?.ticket !== null);
    }
  }, [data]);

  const encodedUrl = encodeURIComponent(currentUrl);
  const whatsappUrl = `https://wa.me/?text=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const apiVar = searchParams.get("select");
    const status = searchParams.get("status");

    const getFilm = async () => {
      try {
        setStatus(status);
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
        // console.log("res is", result.data);
        if (result.data && result.data.length > 0) {
          const filmData = result.data[0];
          setData(filmData);
        }
        // setModalVideo(extractVideoId(result?.data?.attributes?.videoURL));

        if (filmData?.attributes?.ticket === null) {
          setTicket(false);
        } else {
          setTicket(true);
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
            <Image
              className="h-[554] w-[354]"
              src={descriptionImg}
              alt="add somethitng"
            />
          </>
        ) : null,
    },
  ];

  const AccordionItem = ({
    index,
    title,
    content,
    activeIndex,
    toggleAccordion,
  }) => {
    return (
      <div key={index} className="mb-6">
        {content !== null ? (
          <>
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 rounded-t-xl hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index ? "true" : "false"}
                aria-controls={`accordion-collapse-body-${index}`}
              >
                <span className="font-[400] text-[12.49px] leading-[14.91px] tracking-[0.06px]">
                  {title}
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
              className={`p-2 ${
                activeIndex === index ? "border-b-[1px]" : ""
              } ${activeIndex === index ? "" : "hidden"}`}
              aria-labelledby={`accordion-collapse-heading-${index}`}
            >
              <div className="m-[20px] font-[400] text-[22px] leading-[36px] tracking-[-0.3px]">
                {content}
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  };

  const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <div id="accordion-collapse" data-accordion="collapse" className="">
        {items?.map((item, index) => (
          <AccordionItem
            key={index}
            index={index}
            title={item.title}
            content={item.content}
            activeIndex={activeIndex}
            toggleAccordion={toggleAccordion}
          />
        ))}
      </div>
    );
  };
  const handleToggleModal = () => {
    console.log("toggle");
    dispatch(toggleModal());
  };
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        handleToggleModal();
      }
    };
    if (isModalOpen) {
      window?.history.pushState({ modalOpen: true }, "");
    }
    window?.addEventListener("popstate", handlePopState);
    return () => {
      window?.removeEventListener("popstate", handlePopState);
    };
  }, [isModalOpen, handleToggleModal]);

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
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] ${
            isSlidingOut ? "slide-out-top" : ""
          }`}
        ></div>
      )}

      <NavBarDetails />
      <div
        className={`border-t-2 ${
          language === "ENG" ? "font-custom1" : "font-custom3"
        }`}
        dir={dir}
      >
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
          </div>
        </div>

        {screenWidth <= 768 ? (
          <div className="border-black border-b-[1px] px-[17px] w-full my-[24px]">
            {status === "all" ? (
              <div
                className={
                  "lg:mr-[100px] md:mr-[25px] xl:mr-[200px] flex flex-col items-start w-full "
                }
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
                  <p className="uppercase text-[12.1px] leading-[25px]  text-gray mb-[10px] tracking-[0.06px]">
                    {language === "ENG" ? "RELEASE YEAR" : "من كتابة وإخراج"}
                  </p>
                </div>
                <div>
                  <div className="uppercase font-[600] text-[24px] leading-[24px] mb-[10px] text-black">
                    {!isFuture ? (
                      <p
                        className={`${
                          language === "ENG" ? "font-custom1" : "font-custom3"
                        } font-[500] uppercase text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]`}
                      >
                        {new Date(
                          data.attributes?.releaseDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                        })}
                      </p>
                    ) : (
                      <p
                        className={`${
                          language === "ENG" ? "font-custom1" : "font-custom3"
                        }  uppercase text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[500] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]`}
                      >
                        {language === "ENG" ? "Coming Soon" : "قريبًا"}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {data?.attributes?.type !== null ? (
              <>
                {" "}
                <div className="mt-[20px]">
                  <p className=" uppercase text-[12.1px] leading-[25px] text-gray mb-[10px] tracking-[0.06px]">
                    {data?.attributes?.type}
                  </p>
                </div>
                <div>
                  <p
                    className={`${
                      language === "ENG" ? "font-custom1" : "font-custom3"
                    } uppercase font-[500] text-[24px] leading-[1] leading-[24px] mb-[20px] text-black tracking-[-1.14px]  lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]`}
                  >
                    {data?.attributes?.name}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}

            {data?.attributes?.producedBy !== null ? (
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
          <div className="flex justify-between items-start gap-10 w-full bg-white px-[90px] my-[90px]">
            {data?.attributes?.releaseDate !== null ? (
              <div className="">
                <p className=" font-[400] text-[10px] leading-[25px] tracking-[0.08px] text-gray m-0 mb-[10px] lg:font-[400] 2xl:text-[14.1px] lg:leading-[25px] lg:tracking-[0.08px]">
                  {language === "ENG" ? "RELEASE YEAR" : "العام القادم"}
                </p>
                <div className=" font-[500] text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]">
                  {!isFuture ? (
                    <p
                      className={`${
                        language === "ENG" ? "font-custom1" : "font-custom3"
                      } font-[500] uppercase text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]`}
                    >
                      {new Date(
                        data.attributes?.releaseDate
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                      })}
                    </p>
                  ) : (
                    <p
                      className={`${
                        language === "ENG" ? "font-custom1" : "font-custom3"
                      } font-[500] uppercase text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]`}
                    >
                      {language === "ENG" ? "Coming Soon" : "قريبًا"}
                    </p>
                  )}
                </div>

                <div className="mt-[40px]">
                  {data?.attributes?.type !== null ? (
                    <div className="">
                      <p className=" font-[400] uppercase text-[10px] leading-[25px] tracking-[0.08px] text-gray m-0 mb-[10px] lg:font-[400] 2xl:text-[14.1px] lg:leading-[25px] lg:tracking-[0.08px]">
                        {data?.attributes?.type}
                      </p>
                      <p className=" font-[500] uppercase text-[24px] leading-[1] tracking-[-1.14px] text-black  m-0  lg:font-[550] lg:text-[37.2px] lg:leading-[38px] lg:tracking-[-1.14px]">
                        {data?.attributes?.name}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col justify-center items-start w-full xl:max-w-2xl md:max-w-md">
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
                <div className="  flex flex-col justify-start items-start  md:h-[150px] ">
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
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {screenWidth <= 768 ? <Accordion items={accordionItems} /> : ""}
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
      </div>
    </>
  );
};

export default Music;
