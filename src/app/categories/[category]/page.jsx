"use client";
import React, { useState } from "react";
import ContactUs from "../../../components/redirect-contact-us/RedirectContactUs";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ProgressiveImage from "react-progressive-graceful-image";
import Link from "next/link";
import Dropdown from "@/components/filterDropdown/Dropdown";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "./style.css";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SkeletonGrid from "@/components/skeleton/SkeletonGrid";
import HoverLetter from "@/components/home/HoverLetter";
const expectedDataLength = 3;

const Category = () => {
  const serviceImageMap = {
    Netflix: "/images/netflix.svg",
    YouTube: "/images/youtube-white.svg",
    Shahid: "/images/shahid.svg",
    Disney: "/images/disney.svg",
  };

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const filmsData = useSelector((state) => state.films.filmsData);
  const documentariesData = useSelector(
    (state) => state.documentaries.documentariesData
  );
  const liveShowsData = useSelector((state) => state.liveShows.liveShowsData);
  const showsData = useSelector((state) => state.shows.showsData);
  const musicData = useSelector((state) => state.music.musicData);

  const router = useRouter();
  const pathname = usePathname();
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [nowData, setNowData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [clickFlag, setClickFlag] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRootPath, setIsRootPath] = useState(false);
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");
  const [ott, setOtt] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headingsData, setHeadingsData] = useState({
    headingTitle: "",
    headingTitleAr: "",
    headingSubscript: "",
    headingSubscriptAr: "",
    categoryIcon: "",
    categoryIcon1: "",
    link: "",
    headingIcon: "",
    contactUsText: "",
    contactUsSubText: "",
    contactUsTextAr: "",
    contactUsSubTextAr: "",
    mainPageApiVar: "",
  });

  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const handleAnimationClick = () => {
    setIsSlidingOut((prevState) => !prevState);
    dispatch(toggleModal(false));
  };
  const handleMouseEnter = () => {
    setIsGifVisible(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsGifVisible(false);
    }, 2500);
  };

  useEffect(() => {
    if (selectedLanguage === "ENG") {
      setLang("en");
    } else {
      setLang("ar");
    }
  }, [selectedLanguage]);

  useEffect(() => {
    switch (pathname) {
      case "/categories/shows":
        document.title = "SHOWS | GHMZA";
        break;
      case "/categories/liveshows":
        document.title = "LIVE SHOWS | GHMZA";
        break;
      case "/categories/music":
        document.title = "MUSIC | GHMZA";
        break;
      case "/categories/films":
        document.title = "FILMS | GHMZA";
        break;
      default:
        document.title = "DOCS | GHMZA";
    }
  }, [pathname]);

  const placeholderImageUrl = "/images/placeholder.jpg";

  const handleNewestClick = () => {
    setClickFlag(true);
    allData?.sort((a, b) => {
      const dateA = new Date(a?.attributes?.releaseDate);
      const dateB = new Date(b?.attributes?.releaseDate);
      return dateB - dateA;
    });
    setAllData(allData);
  };

  const handleAZClick = () => {
    setClickFlag(false);
    allData?.sort((a, b) => {
      return a?.attributes?.name?.localeCompare(b.attributes?.name);
    });
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

  const getFilms = async () => {
    try {
      const result = await filmsData;

      const ott = [];
      for (let index = 0; index < result.data.length; index++) {
        const item = result.data[index];
        if (item?.attributes?.name === "Netflix") {
          ott[index] = "/images/netflix.svg";
        } else if (item?.attributes?.name === "YouTube") {
          ott[index] = "/images/youtube-white.svg";
        } else if (item?.attributes?.name === "Disney+") {
          ott[index] = "/images/disney.svg";
        } else if (item?.attributes?.name === "Shahid") {
          ott[index] = "/images/shahid.svg";
        }
      }

      const upcoming = [];
      const all = [];
      const currentDate = getCurrentDateFormatted();

      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const releaseDate = item.attributes?.releaseDate;
        if (releaseDate > currentDate) {
          upcoming.push(item);
        } else {
          all.push(item);
        }
      }

      all?.sort((a, b) => {
        const dateA = new Date(a?.attributes?.releaseDate);
        const dateB = new Date(b?.attributes?.releaseDate);
        return dateB - dateA;
      });

      setUpcomingData(upcoming);
      setAllData(all);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const getDocus = async () => {
    try {
      const result = await documentariesData;

      const upcoming = [];
      const all = [];
      const currentDate = getCurrentDateFormatted();

      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const releaseDate = item.attributes?.releaseDate;
        if (releaseDate > currentDate) {
          upcoming.push(item);
        } else {
          all.push(item);
        }
      }

      setUpcomingData(upcoming);
      all?.sort((a, b) => {
        const dateA = new Date(a?.attributes?.releaseDate);
        const dateB = new Date(b?.attributes?.releaseDate);
        return dateB - dateA;
      });
      setAllData(all);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const getShows = async () => {
    try {
      const result = await showsData;

      const upcoming = [];
      const all = [];
      const currentDate = getCurrentDateFormatted();

      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const releaseDate = item.attributes?.releaseDate;
        if (releaseDate <= currentDate && getDaysDifference(releaseDate) < 61) {
          upcoming.push(item);
        } else {
          all.push(item);
        }
      }

      setUpcomingData(upcoming);
      all?.sort((a, b) => {
        const dateA = new Date(a?.attributes?.releaseDate);
        const dateB = new Date(b?.attributes?.releaseDate);
        return dateB - dateA;
      });
      setAllData(all);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const getMusic = async () => {
    try {
      const result = await musicData;

      const upcoming = [];
      const all = [];
      const currentDate = getCurrentDateFormatted();

      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const releaseDate = item.attributes?.releaseDate;
        if (releaseDate > currentDate) {
          upcoming.push(item);
        
        } else if (
          releaseDate <= currentDate &&
          getDaysDifference(releaseDate) < 61
        ) {
          upcoming.push(item);
        
        } else {
        
          all.push(item);
        }
      }

      setUpcomingData(upcoming);
      all?.sort((a, b) => {
        const dateA = new Date(a?.attributes?.releaseDate);
        const dateB = new Date(b?.attributes?.releaseDate);
        return dateB - dateA;
      });
      setAllData(all);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const getLiveShows = async () => {
    try {
      const result = await liveShowsData;

      const upcoming = [];
      const all = [];
      const currentDate = getCurrentDateFormatted();

      for (let i = 0; i < result.data.length; i++) {
        const item = result.data[i];
        const releaseDate = item.attributes?.releaseDate;
        if (releaseDate > currentDate) {
          upcoming.push(item);
        
        } else if (
          releaseDate <= currentDate &&
          getDaysDifference(releaseDate) < 61
        ) {
          upcoming.push(item);
        
        } else {
        
          all.push(item);
        }
      }

      setUpcomingData(upcoming);
      all?.sort((a, b) => {
        const dateA = new Date(a?.attributes?.releaseDate);
        const dateB = new Date(b?.attributes?.releaseDate);
        return dateB - dateA;
      });
      setAllData(all);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const categoryConfig = {
    docs: {
      getData: getDocus,
      headingsData: {
        headingTitle: "DOCUS",
        headingTitleAr: "في الوثائقيات",
        headingSubscript: "DOCUS",
        headingSubscriptAr: " وثائقيات",
        categoryIcon: "/images/documentaryGif.gif",
        categoryIcon1: "/images/camera-icon.png",
        link: "documentaries",
        headingIcon: "/images/two-circle.png",
        contactUsText: "HAVE AN IDEA FOR A DOCUMENTARY",
        contactUsTextAr: "هل لديك فكرة لبرنامج وثائقي؟",
        contactUsSubText: "CONTACT US AND LETS GET DOCUMENTING.",
        contactUsSubTextAr: "تواصل معنا",
        mainPageApiVar: "documentaries",
      },
    },
    films: {
      getData: getFilms,
      headingsData: {
        headingTitle: "FILMS",
        headingTitleAr: "في الأفلام ",
        headingSubscript: "ENTERTAINMENT",
        headingSubscriptAr: " ترفيه",
        categoryIcon: "/images/films.gif",
        categoryIcon1: "/images/films.png",
        link: "films",
        headingIcon: "/images/two-circle.png",
        contactUsText: "HAVE AN IDEA FOR A FILM",
        contactUsTextAr: "هل لديك فكرة فيلم؟",
        contactUsSubText: "CONTACT US AND LETS GET FILMING.",
        contactUsSubTextAr: "تواصل معنا",
        mainPageApiVar: "films",
      },
    },
    shows: {
      getData: getShows,
      headingsData: {
        headingTitle: "SHOWS",
        headingTitleAr: "برامج",
        headingSubscript: "HAPPENING NOW",
        headingSubscriptAr: " شاهد الآن",
        categoryIcon: "/images/tvShowsGif.gif",
        categoryIcon1: "/images/movie-icon.png",
        link: "shows",
        headingIcon: "/images/four-circle.png",
        contactUsText: "HAVE AN IDEA FOR A SHOW",
        contactUsTextAr: "لديك فكرة برنامج؟",
        contactUsSubText: "Hit us up and let's get this show on the road!",
        contactUsSubTextAr: "تواصل معنا",
        mainPageApiVar: "shows",
      },
    },
    music: {
      getData: getMusic,
      headingsData: {
        headingTitle: "MUSIC",
        headingTitleAr: "في الموسيقى",
        headingSubscript: "MUSIC",
        headingSubscriptAr: " موسيقى",
        categoryIcon: "/images/musicGif.gif",
        categoryIcon1: "/images/music-icon.png",
        link: "music",
        headingIcon: "/images/three-circle.png",
        contactUsText: "LET US HELP CREATE YOUR NEXT TRACK",
        contactUsTextAr: "تريد نشر أغنية؟",
        contactUsSubText: "Hit us up and let's get RECORD SPINNING!",
        contactUsSubTextAr: "تواصل معنا",
        mainPageApiVar: "musics",
      },
    },
    liveshows: {
      getData: getLiveShows,
      headingsData: {
        headingTitle: "LIVE SHOWS",
        headingTitleAr: "عروض مباشرة",
        headingSubscript: "HAPPENING NOW",
        headingSubscriptAr: " الفعاليات",
        categoryIcon: "/images/tvShowsGif.gif",
        categoryIcon1: "/images/movie-icon.png",
        link: "liveshows",
        headingIcon: "/images/four-circle.png",
        contactUsText: "LET US HELP YOU PERFORM LIVE",
        contactUsTextAr: "تود إقامة فعالية؟",
        contactUsSubText: "Hit us up and LETS GEt ON STAGE!",
        contactUsSubTextAr: "تواصل معنا",
        mainPageApiVar: "lives",
      },
    },
  };

  useEffect(() => {
    setIsRootPath(router.pathname === "/");
  }, [router.pathname]);

  useEffect(() => {
    if (isRootPath) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRootPath]);

  const category = pathname.split("/").pop();
  useEffect(() => {
    if (selectedLanguage === "ENG") {
      setLang("en");
    } else {
      setLang("ar");
    }

    // Access the current route here
    const config = categoryConfig[category];

    if (config) {
      config.getData();
      setHeadingsData(config.headingsData);
    }
  }, [router.pathname, lang, filmsData]);

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      setScreenWidth(newScreenWidth);
      setShowDropdown(newScreenWidth < 700);
    };

    // Check if window is defined (i.e., if we're in a browser environment)
    if (typeof window !== "undefined") {
      // Add event listener
      window.addEventListener("resize", handleResize);

      // Initial dimensions
      handleResize();
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

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
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-out-bottom`}
        />
      )}

      <div
        dir={dir}
        className={`${selectedLanguage === "ENG" ? "custom1" : "font-custom3"}
      category-main-wrapper mt-[73.59px] lg:mt-[108px]`}
      >
        {upcomingData?.length > 0 ? (
          <div className="">
            <div
              className={` ${language === "ENG" ? "h-[100px]" : "h-[110px]"} ${
                language === "ENG"
                  ? "border-l-pink border-l-[19px] md:pl-6 border-r-black border-r-[0.5px]"
                  : "border-r-pink border-r-[19px] border-l-black border-l-[0.5px] pr-[1.5rem]"
              } border-t-black    border-t-[0.5px] border-b-[0.5px] flex flex-col md:flex-row 3xl:justify-between 2xl:justify-between xl:justify-between lg:justify-between md:justify-between justify-center md:items-center items-start`}
            >
              <div className="flex items-center h-full">
                <div
                  className={` ${
                    language === "ENG" ? "custom1" : " font-custom3"
                  } flex items-start gap-[3px] xl:gap-[5px]  `}
                >
                  {category.toLowerCase().includes("liveshows") ? (
                    <p
                      className={` ${
                        language === "ENG"
                          ? "font-custom1 "
                          : " font-custom3 ps-[0px]"
                      } text-black-500 font-bold md:font-[700] leading-[35px] 2xl:leading-[46px]  transition duration-700 ease-in-out   md:ps-0 text-[44px] md:text-[44px] tracking-[-1.76px] md:tracking-[-2.96px] 2xl:font-[800]  xl:font-[600] xl:text-[45px] 2xl:text-[73px] flex flex-wrap`}
                      // style={{ transition: "font-weight 0.3s ease-in-out" }}
                    >
                      <span
                        className={` ${
                          language === "ENG"
                            ? "font-custom1 ps-[10px]"
                            : " font-custom3"
                        }  `}
                      >
                        {language === "ENG" ? (
                          <HoverLetter text="GOING ON" />
                        ) : (
                          "يحدث الآن"
                        )}
                      </span>
                    </p>
                  ) : category.toLowerCase().includes("shows") ? (
                    <p
                      className={` ${
                        selectedLanguage === "ENG"
                          ? "font-custom1 ps-[10px]"
                          : " font-custom3 ps-[0px]"
                      } text-black-500 font-bold md:font-[700] leading-[35px] 2xl:leading-[46px]    md:ps-0 text-[44px] md:text-[44px] tracking-[-1.76px] md:tracking-[-2.96px] 2xl:font-[800]  xl:font-[600] xl:text-[45px] 2xl:text-[73px] flex flex-wrap`}
                    >
                      <span
                        className={` ${
                          selectedLanguage === "ENG"
                            ? "custom1 mr-2"
                            : " font-custom3"
                        }  `}
                      >
                        {selectedLanguage === "ENG" ? (
                          <HoverLetter text="WHATS ON" />
                        ) : (
                          "ماذا يجري"
                        )}
                      </span>
                    </p>
                  ) : (
                    <p
                      className={` ${
                        selectedLanguage === "ENG"
                          ? "font-custom1 ps-[10px]"
                          : " font-custom3 ps-[0px]"
                      } text-black-500 font-bold md:font-[700] leading-[35px] 2xl:leading-[46px]    md:ps-0 text-[44px] md:text-[44px] tracking-[-1.76px] md:tracking-[-2.96px] 2xl:font-[800]  xl:font-[600] xl:text-[45px] 2xl:text-[73px] flex flex-wrap`}
                    >
                      <span
                        className={` ${
                          selectedLanguage === "ENG"
                            ? "custom1 mr-2"
                            : " font-custom3"
                        }  `}
                      >
                        {selectedLanguage === "ENG" ? (
                          <HoverLetter text="UPCOMING" />
                        ) : (
                          "قريبًا "
                        )}
                      </span>
                      {selectedLanguage === "ENG" ? (
                        <HoverLetter text={category?.toUpperCase()} />
                      ) : (
                        headingsData?.headingTitleAr
                      )}
                    </p>
                  )}
                  <p className="hidden md:flex text-[10.53px] font-normal tracking-[-0.42px] leading-[9.73px]">
                    <span>/</span>
                    {selectedLanguage === "ENG"
                      ? headingsData?.headingSubscript
                      : headingsData?.headingSubscriptAr}
                  </p>
                </div>
              </div>

              {category.toLowerCase().includes("liveshows") ||
              category.toLowerCase().includes("shows") ? (
                ""
              ) : (
                <div
                  className={
                    "hidden md:flex items-center gap-5 w-full md:w-auto "
                  }
                >
                  <div
                    className="relative h-[70px] w-[70px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={`/images/${category}.png`}
                      alt="logo"
                      width={70}
                      height={70}
                      className={`absolute ${
                        isGifVisible ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <Image
                      src={`/images/${category}.gif`}
                      alt="hover-logo"
                      width={70}
                      height={70}
                      className={`absolute ${
                        isGifVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                  <div
                    className={`w-[102px] h-[100px]  flex justify-center items-center ${
                      selectedLanguage === "ENG"
                        ? "border-black border-l-[0.5px]"
                        : "border-black border-r-[0.5px]"
                    } `}
                  >
                    <div className=" relative w-[102px] h-[100px]">
                      <Image
                        src={`/images/${category}.svg`}
                        alt="add here"
                        fill
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isLoading ? (
              <SkeletonGrid count={expectedDataLength} />
            ) : (
              <ResponsiveMasonry className="w-full">
                <Masonry
                  className="grid grid-cols-1 md:grid-cols-3 gap-5 2xl:px-[42px] xl:px-[42px] p-[1rem] mt-[24px] w-full"
                  columnscount={{ 350: 1, 750: 2, 900: 3 }}
                  gutter="40px"
                >
                  {upcomingData?.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={{
                          pathname:
                            headingsData?.link === "music"
                              ? `/${headingsData?.link}`
                              : `/project/${headingsData?.link}`,
                          query: {
                            id: item?.attributes?.uniqueID,
                            select: headingsData.mainPageApiVar,
                            status: "upcoming",
                          },
                        }}
                        onClick={handleAnimationClick}
                      >
                        <div className="relative group overflow-hidden">
                          <div className="relative group overflow-hidden">
                            <div className="z-10 hidden md:block darken-overlay absolute inset-0 bg-black opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-60" />
                            {!showDropdown === true ? (
                              <div className="z-10 absolute mr-[26px] ml-[26px] mt-[26px] flex flex-col items-start justify-start opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex gap-4">
                                  {item?.attributes?.otts?.data?.map(
                                    (ottItem) => {
                                      console.log(
                                        "🚀 ~ Category ~ ottItem:",
                                        ottItem
                                      );
                                      const { id, attributes } = ottItem;
                                      const imageName = attributes?.name;
                                      const imagePath =
                                        serviceImageMap[imageName] || "";

                                      return (
                                        <Image
                                          key={id}
                                          className="lg:h-[45px] lg:w-[55px] md:h-[30px] md:w-[38px] sm:h-[30px] sm:w-[38px]"
                                          alt={imageName || "service logo"}
                                          src={imagePath}
                                        />
                                      );
                                    }
                                  )}
                                </div>
                                {/* h-[38px] w-[86px] */}
                                {/* {item.attributes?.releaseDate !== null ? (
                            <div className="mt-[15px] text-[#ffffff] sm:mt-[15px] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                              <p className="font-custom1 lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                {selectedLanguage === "ENG"
                                  ? "RELEASE DATE"
                                  : "تاريخ الإصدار"}
                              </p>
                              <p className="font-custom1 lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px]">
                                {new Date(
                                  item.attributes?.releaseDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </p>
                            </div>
                          ) : (
                            ""
                          )} */}
                                   {getDaysDifference(item.attributes?.releaseDate) > 0 ? (
                               <div className="mt-[15px] text-[#ffffff] sm:mt-[15px] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                               <p className=" lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                 {selectedLanguage === "ENG"
                                   ? "RELEASE DATE"
                                   : "تاريخ الإصدار"}
                               </p>
                               <p className="font-custom1 mt-[7px] lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px]">
                                 {
                                 new Date(
                                   item.attributes?.releaseDate
                                 ).toLocaleDateString("en-US", {
                                   year: "numeric",
                                   month: "short",
                                   day: "2-digit",
                                 })}
                               </p>
                             </div>
                            ) : (
                              <p
                                className={`${
                                  selectedLanguage === "ENG"
                                    ? "font-custom1"
                                    : "font-custom3"
                                } lg:text-[20px] xs:text-[17px] font-[700] text-white leading-[21.94px] tracking-[-0.66px] mt-4`}
                              >
                                {selectedLanguage === "ENG"
                                  ? "COMING SOON"
                                  : "قريبًا"}
                              </p>
                            )}
                                {item?.attributes?.directedBy !== null ? (
                                  <div className=" mt-[15px] text-[#ffffff] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                                    <p className="  lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                      {selectedLanguage === "ENG"
                                        ? "DIRECTED BY"
                                        : "من إخراج"}
                                    </p>
                                    <p className="font-custom1  lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px]">
                                      {item?.attributes?.directedBy}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {item?.attributes?.cast !== null ? (
                                  <div className=" mt-[15px] text-[#ffffff] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                                    <p className="   lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                      {selectedLanguage === "ENG"
                                        ? "STARRING"
                                        : "بطولة"}
                                    </p>
                                    <p className="font-custom1  lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px] flex flex-wrap">
                                      {item?.attributes?.cast}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              ""
                            )}
                            {/* <ProgressiveImage
                              delay={300}
                              src={
                                item.attributes?.thumbnail?.data?.attributes
                                  ?.url
                              }
                              placeholder={placeholderImageUrl}
                            >
                              {(src, loading) => ( */}
                            <Image
                              className={`image`}
                              src={
                                item.attributes?.thumbnail?.data?.attributes
                                  ?.url
                              }
                              alt="sea beach"
                              data-tooltip={
                                item?.attributes?.cursor
                                  ? `/${item?.attributes?.cursor}`
                                  : ""
                              }
                              style={{
                                objectFit: "cover",
                                height: ` ${
                                  showDropdown
                                    ? "199.13"
                                    : item.attributes?.thumbnail?.data
                                        ?.attributes?.formats?.small?.height +
                                      item.attributes?.thumbnail?.data
                                        ?.attributes?.formats?.small?.height *
                                        0.16
                                }px `,
                                // height: `${item.attributes?.thumbnail?.data?.attributes?.formats?.small?.height}px`,
                                width: "100%",
                              }}
                              width={100}
                              height={100}
                            />
                            {/* )}
                            </ProgressiveImage> */}
                          </div>

                          <div className="flex flex-row-reverse justify-between bg-white md:flex-col md:items-start md:justify-center md:mt-[12.6px] mt-[10px]">
                            {getDaysDifference(item.attributes?.releaseDate) > 0 ? (
                              <p
                                className={`${
                                  selectedLanguage === "ENG"
                                    ? "font-custom1"
                                    : "font-custom3"
                                } text-[14.53px] text-[#888888] font-[400] font-custom1 md:text-[15px] leading-[18px] md:leading-[18px] md:tracking-[0.08px]`}
                              >
                                {new Date(
                                  item.attributes?.releaseDate
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                })}
                              </p>
                            ) : (
                              <p
                                className={`${
                                  selectedLanguage === "ENG"
                                    ? "font-custom1"
                                    : "font-custom3"
                                } text-gray uppercase font-custom1 font-[400] text-[14.53px] md:text-[15px] leading-[18px] md:leading-[18px] md:tracking-[0.08px]`}
                              >
                                {selectedLanguage === "ENG"
                                  ? "Coming Soon"
                                  : "قريبًا"}
                              </p>
                            )}

                            <p
                              className={`${
                                selectedLanguage === "ENG"
                                  ? "font-custom1 leading-[24px] md:leading-[38px]"
                                  : "font-custom3 pr-1 leading-[32px] md:leading-[38px]"
                              } uppercase text-black w-[225px] md:w-auto font-bold text-[23px] md:text-[24px] tracking-[-1.14px]`}
                            >
                              {item.attributes?.name}
                              <p className=" md:hidden text-[14.53px] xl:text-[15px] font-[400] text-[#888888] leading-[18px] tracking-[0.08px]">
                                {item?.attributes?.cursor}
                              </p>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="custom_height">
          <div
            className={`mt-[33px] md:pl-6 ${
              language === "ENG" ? "h-[100px]" : "h-[110px]"
            } md:px-8   ${
              language === "ENG"
                ? "border-l-pink border-l-[19px] font-custom1   border-r-black border-r-[0.5px]"
                : "border-r-pink font-custom3  border-r-[19px] border-l-black border-l-[0.5px] pr-[1.5rem]"
            } border-t-black  bg-white   border-t-[0.5px] border-b-[0.5px] flex flex-col md:flex-row 3xl:justify-between 2xl:justify-between xl:justify-between lg:justify-between md:justify-between justify-center md:items-center items-start`}
          >
            {category?.toLowerCase().includes("liveshows") ? (
              <p
                className={`transition duration-300 ease-in-out font-normal hover:font-bold align-middle ${
                  language === "ENG" ? "ps-[10px]" : "ps-[0px] "
                } text-black-500 font-bold md:font-[700] text-[44px] leading-[40px] md:ps-0 md:text-[44px] tracking-[-1.76px] md:tracking-[-2.96px] 2xl:font-[800] xl:font-[600] xl:text-[45px] 2xl:text-[73px]`}
              >
                {language === "ENG" ? <HoverLetter text="ALL" /> : "جميع"}{" "}
                {language === "ENG" ? (
                  <HoverLetter text="SHOWS" />
                ) : (
                  headingsData?.headingTitleAr
                )}
              </p>
            ) : (
              <p
                className={` align-middle ${
                  language === "ENG" ? "ps-[10px]" : "ps-[0px]"
                }  text-black-500 font-bold md:font-[700] text-[44px] leading-[40px]    md:ps-0  md:text-[44px] tracking-[-1.76px] md:tracking-[-2.96px] 2xl:font-[800]  xl:font-[600] xl:text-[45px] 2xl:text-[73px]`}
              >
                {language === "ENG" ? <HoverLetter text="ALL" /> : "جميع"}{" "}
                {language === "ENG" ? (
                  <HoverLetter text={category?.toUpperCase()} />
                ) : (
                  headingsData?.headingTitleAr
                )}
              </p>
            )}

            {showDropdown ? (
              <></>
            ) : (
              <>
                <div
                  className={`${
                    language === "ENG" ? "font-custom1" : "font-custom3"
                  } flex items-center gap-5`}
                >
                  <p className=" text-gray font-normal text-[14.6px] tracking-[-0.08px]">
                    {language === "ENG" ? "SORT BY: " : "تصنيف:"}
                  </p>
                  <p
                    className={`cursor-pointer  font-[400] text-[14.65px] leading-[25px] tracking-[0.08px] ${
                      clickFlag ? "selected" : ""
                    }`}
                    onClick={handleNewestClick}
                  >
                    {language === "ENG" ? "NEWEST" : "الأحدث"}
                  </p>
                  <p
                    className={`cursor-pointer  font-[400] text-[14.65px] leading-[25px] tracking-[0.08px] ${
                      !clickFlag ? "selected" : ""
                    }`}
                    onClick={handleAZClick}
                  >
                    {language === "ENG" ? "A-Z" : "أ-ي"}
                  </p>
                </div>
              </>
            )}
          </div>
          {showDropdown ? (
            <Dropdown
              handleNewestClick={handleNewestClick}
              handleAZClick={handleAZClick}
            />
          ) : (
            // <>
            //   <div className="w-[100%-18px] mt-4 mx-[18px] overflow-hidden ">
            //     <Select className=" rounded-none  ">
            //       <Option>NEWEST</Option>
            //       <Option>A-Z</Option>
            //     </Select>
            //   </div>
            // </>
            <></>
          )}
          {isLoading ? (
            <SkeletonGrid count={expectedDataLength} />
          ) : (
            <ResponsiveMasonry className="w-full">
              <Masonry
                className="grid grid-cols-1 md:grid-cols-3 gap-5 2xl:px-[42px] xl:px-[42px] px-[18px] mt-[24px] w-full"
                columnscount={{ 350: 1, 750: 2, 900: 3 }}
                gutter="40px"
              >
                {allData?.map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={{
                        pathname:
                          headingsData?.link === "music"
                            ? `/${headingsData?.link}`
                            : `/project/${headingsData?.link}`,
                        query: {
                          id: item?.attributes?.uniqueID,
                          select: headingsData.mainPageApiVar,
                          status: "all",
                        },
                      }}
                      onClick={handleAnimationClick}
                    >
                      <div className="relative group overflow-hidden">
                        <div className="relative group overflow-hidden">
                          <div className="z-10 hidden md:block darken-overlay absolute inset-0 bg-black opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-60" />
                          {!showDropdown === true ? (
                            <div className="z-10 absolute mr-[26px] ml-[26px] mt-[26px] flex flex-col items-start justify-start opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
                              <div className="flex gap-4">
                                {item?.attributes?.otts?.data?.map(
                                  (ottItem) => {
                                    const { id, attributes } = ottItem;
                                    const imageName = attributes?.name;
                                    const imagePath =
                                      serviceImageMap[imageName] || "";

                                    return (
                                      <div
                                        key={id}
                                        className="lg:h-[45px] lg:w-[55px] md:h-[30px] md:w-[38px] sm:h-[30px] sm:w-[38px] relative"
                                      >
                                        <Image
                                          alt={"service logo"}
                                          src={imagePath}
                                          fill
                                        />
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                              {/* h-[38px] w-[86px] */}
                              {item.attributes?.releaseDate !== null ? (
                                <div className="mt-[15px] text-[#ffffff] sm:mt-[15px] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                                  <p className=" lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                    {selectedLanguage === "ENG"
                                      ? "RELEASE DATE"
                                      : "تاريخ الإصدار"}
                                  </p>
                                  <p className="font-custom1 mt-[7px] lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px]">
                                    {new Date(
                                      item.attributes?.releaseDate
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "2-digit",
                                    })}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}

                              {item?.attributes?.directedBy !== null ? (
                                <div className=" mt-[15px] text-[#ffffff]  md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                                  <p className="  lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                    {selectedLanguage === "ENG"
                                      ? "DIRECTED BY"
                                      : "من إخراج"}
                                  </p>
                                  <p className="font-custom1  lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px]">
                                    {item?.attributes?.directedBy}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                              {item?.attributes?.cast !== null ? (
                                <div className=" mt-[15px] text-[#ffffff] md:[15px] lg:[20px] xl:mt-[25px] 2xl:mt-[25px] 3xl:mt-[25px]">
                                  <p className="   lg:text-[21.17px] xs:text-[18px] sm:text-[18px] font-[700] leading-[21.94px] tracking-[-0.66px]">
                                    {selectedLanguage === "ENG"
                                      ? "STARRING"
                                      : "بطولة"}
                                  </p>
                                  <p className="font-custom1  lg:text-[20px]  xs:text-[17px]font-[400] xs:text-[17px]font-[400] leading-[21.94px] tracking-[-0.66px] flex flex-wrap">
                                    {item?.attributes?.cast}
                                  </p>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <ProgressiveImage
                            delay={300}
                            src={
                              item.attributes?.thumbnail?.data?.attributes?.url
                            }
                            placeholder={placeholderImageUrl}
                          >
                            {(src, loading) => ( */}
                          <Image
                            className={`image  `}
                            src={
                              item.attributes?.thumbnail?.data?.attributes?.url
                            }
                            alt="sea beach"
                            data-tooltip={
                              item?.attributes?.cursor
                                ? `/${item?.attributes?.cursor}`
                                : ""
                            }
                            style={{
                              objectFit: "cover",
                              height: ` ${
                                showDropdown
                                  ? "199.13"
                                  : item.attributes?.thumbnail?.data?.attributes
                                      ?.formats?.small?.height +
                                    item.attributes?.thumbnail?.data?.attributes
                                      ?.formats?.small?.height *
                                      0.16
                              }px `,
                              width: "100%",
                            }}
                            width={100}
                            height={100}
                          />
                          {/* )}
                          </ProgressiveImage> */}
                        </div>
                        <div className="flex flex-row-reverse justify-between bg-white md:flex-col md:items-start md:justify-center md:mt-[12.6px] mt-[10px]">
                          <p
                            className={`${
                              selectedLanguage === "ENG"
                                ? "font-custom1"
                                : "font-custom3"
                            } text-[14.53px] text-[#888888] font-[400] uppercase font-custom1  md:text-[15px] leading-[18px] md:leading-[18px] md:tracking-[0.08px]`}
                          >
                            {new Date(
                              item.attributes?.releaseDate
                            ).getFullYear()}
                          </p>
                          <p
                            className={`${
                              selectedLanguage === "ENG"
                                ? "font-custom1 leading-[24px] md:leading-[38px]"
                                : "font-custom3 pr-1 leading-[32px] md:leading-[38px]"
                            } uppercase text-black w-[225px] md:w-auto font-bold text-[23px] md:text-[24px] tracking-[-1.14px] lg:mt-0`}
                          >
                            {item.attributes?.name}
                            <p className="md:hidden text-[14.53px] xl:text-[15px] font-[400] text-[#888888] leading-[18px] tracking-[0.08px]">
                              {item?.attributes?.cursor}
                            </p>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>

        <div className="border-black border-[0.5px] w-full py-3 md:py-6 md:mt-[69px] lg:mt-[69px] xl:mt-[69px] 2xl:mt-[69px] 3xl:mt-[69px] mt-[25px]">
          <ContactUs
            titleEng={headingsData?.contactUsText}
            titleAr={headingsData?.contactUsTextAr}
            subTitleEng={headingsData?.contactUsSubText}
            subTitleAr={headingsData?.contactUsSubTextAr}
          />
        </div>
      </div>
    </>
  );
};

export default Category;
