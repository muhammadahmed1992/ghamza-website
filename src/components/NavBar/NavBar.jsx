"use client";
import "./NavBar.css";
import Image from "next/image";
import Link from "next/link";
import utils from "@/util/utils";
import navItemsData from "./navItemsData.json";
import breadcrumbTexts from "./breadcrumbTexts.json";
import BurgerButton from "../BurgerButton/BurgerButton";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "@/redux/searchSlice";
import { setLastQuery, setSearchResults } from "@/redux/searchResultsSlice";
import { toggleLanguage } from "@/redux/languageSlice";
import { setFilmsData } from "@/redux/filmsSlice";
import { setDocumentariesData } from "@/redux/documentariesSlice";
import { setShowsData } from "@/redux/showsSlice";
import { setMusicData } from "@/redux/musicSlice";
import { setLiveShowsData } from "@/redux/liveShowsSlice";

export function HoverLetterMenu({ text }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [weight, setWeight] = useState(800);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400) {
        // setWeight(600);
        setIsLight(true);
      } else {
        // setWeight(800); // Both conditions set the same weight, adjust if needed
        setIsLight(false);
      }
    };

    handleResize(); // Set initial weight based on current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const textSpans = text?.split("").map((char, index) => (
    <span
      key={index}
      onMouseOver={() => handleHover(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        fontWeight:
          hoveredIndex === index ||
          hoveredIndex === index - 1 ||
          hoveredIndex === index + 1
            ? weight
            : "",
        cursor: "pointer",
        // transition: "font-weight 0.3s ease-in-out",
        lineHeight: "30px",
      }}
      className="light_Nav_"
    >
      {char}
    </span>
  ));

  return <span className="">{textSpans}</span>;
}

const NavBar = () => {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const languageRef = useRef(null);
  const headerRef = useRef(null);
  const lastScrollTopRef = useRef(0);
  const drawerRef = useRef(null);
  const drawerButtonRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVerticleSilder, setIsVerticleSilder] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "ar" : "en");
  const [menu, setMenu] = useState();
  const [burgerButtonvisible, setBurgerButtonVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isSlidingOutSecond, setIsSlidingOutSecond] = useState(false);

  const isHomePage = pathname === "/";
  const isAboutPage = pathname === "/about";
  const isMusicPage = pathname === "/music";
  const isProjectPage = pathname.includes("/project/");
  const path = "/searchResults";
  let currentScrollTop = 0;

  const handleClickOutside = (event) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target) &&
      drawerButtonRef.current &&
      !drawerButtonRef.current.contains(event.target)
    ) {
      toggleDrawer();
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    setLang(selectedLanguage === "ENG" ? "ar" : "en");
  }, [selectedLanguage]);

  const handleToggleLanguage = () => {
    setIsSlidingOut((prevState) => !prevState);
    dispatch(toggleLanguage());
    getApi(lang);
    setTimeout(() => {
      setIsSlidingOut(false);
      setIsSlidingOutSecond((prevState) => !prevState);
    }, 2000);
    setTimeout(() => {
      setIsSlidingOutSecond(false);
    }, 500);
  };

  const getBreadcrumbText = (pathname, selectedLanguage) => {
    const breadcrumbs = {
      "/": "menu",
      "/about": "about",
      "/categories/films": "films",
      "/categories/shows": "shows",
      "/categories/docs": "docs",
      "/categories/music": "music",
      "/categories/liveshows": "liveshows",
      "/contact": "contact",
      "/job": "job"
    };

    const validCategories = ["films", "shows", "docs", "music", "liveshows"];

    if (pathname.startsWith("/categories/")) {
      const category = pathname.split("/")[2];
      if (!validCategories.includes(category)) {
        return router.push("/not-found");
      }
    }

    const breadcrumbKey = breadcrumbs[pathname];
    if (breadcrumbKey) {
      return breadcrumbTexts[breadcrumbKey][selectedLanguage];
    } else {
      return breadcrumbTexts["menu"][selectedLanguage];
    }
  };

  const getDrawerWidth = () => {
    if (isMobile) {
      return "100%";
    } else if (isTablet) {
      return "40%";
    } else {
      return "28%";
    }
  };

  const handleMouseEnter = () => setIsGifVisible(true);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsGifVisible(false);
    }, 3000);
  };

  const toggleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

  const closeDrawer = () => setIsDrawerOpen(false);

  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }

  const handleToggleSearch = () => {
    if (pathname !== path) {
      if (currentScrollTop > 300) {
        scrollToTop();
        dispatch(toggleSearch(false));
      } else {
        scrollToTop();
        dispatch(toggleSearch(true));
        if (isSearchOpen && isMobile) {
          setHeaderVisible(true);
        } else {
          setHeaderVisible(false);
          setBurgerButtonVisible(false);
        }
      }
    }
  };

  const getApi = async (language) => {
    try {
      const filmsData = await fetchData("films", language);
      const documentariesData = await fetchData("documentaries", language);
      const showsData = await fetchData("shows", language);
      const musicData = await fetchData("musics", language);
      const liveShowsData = await fetchData("lives", language);

      dispatch(setFilmsData(filmsData));
      dispatch(setDocumentariesData(documentariesData));
      dispatch(setShowsData(showsData));
      dispatch(setMusicData(musicData));
      dispatch(setLiveShowsData(liveShowsData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function getCurrentDateFormatted() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const fetchData = async (type, language) => {
    try {
      const response = await fetch(
        `${
          utils.BASE_URL
        }${type}?locale=${language}&populate=thumbnail,otts,media&filters[isHidden][$nei]=true&filters[$or][0][expiryDate][$null]=true&filters[$or][1][expiryDate][$gte]=${getCurrentDateFormatted()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${utils.token}`,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const handleSearchInputChange = (event) => setSearchQuery(event.target.value);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    const types = ["shows", "films", "lives", "documentaries", "musics"];
    const allResults = [];
    const lang = selectedLanguage === "ENG" ? "en" : "ar";
    try {
      for (const type of types) {
        const response = await fetch(
          `${utils.BASE_URL}${type}?populate=*&locale=${lang}&filters[name][$containsi]=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${utils.token}`,
            },
          }
        );
        const results = await response.json();
        if (results && results.data) {
          allResults.push(...results.data);
        }
      }
      dispatch(setSearchResults(allResults));
      router.push(path);
      dispatch(toggleSearch(false));
      setHeaderVisible(true);
      dispatch(setLastQuery(searchQuery));
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getMenu = async () => {
    try {
      const response = await fetch(
        `${utils.BASE_URL}/categories?locale=${
          selectedLanguage === "ENG" ? "en" : "ar"
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${utils.token}`,
          },
        }
      );
      const result = await response.json();

      const sorted = result?.data?.sort((a, b) => {
        if (a.id !== undefined && b.id !== undefined) {
          return a.id - b.id;
        }
        if (a.id === undefined) return 1;
        if (b.id === undefined) return -1;
        return 0;
      });
      setMenu(sorted);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 640);
      setIsTablet(screenWidth <= 1140);
      setIsVerticleSilder(screenWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const lastScrollTop = lastScrollTopRef.current;
    if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
      // Scrolling down on project page
      if (currentScrollTop > 720) {
        gsap.to(headerRef.current, {
          backgroundColor: "white",
          color: "black",
        });
        setBurgerButtonVisible(true);
      } else {
        gsap.to(headerRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power4.out",
        });

        setBurgerButtonVisible(false);
      }
      setHeaderVisible(false);
    } else if (currentScrollTop < lastScrollTop && currentScrollTop > 720) {
      setHeaderVisible(true);
      setBurgerButtonVisible(true);
    } else if (currentScrollTop < 720) {
      // Scrolling up or near top on project page
      if (currentScrollTop < 60) {
        // Scrolling up or near top on non-project page
        gsap.to(headerRef.current, {
          autoAlpha: 1,
          duration: 0.3,
          ease: "power4.out",
        });
        setHeaderVisible(true);
        setBurgerButtonVisible(true);
        if (isSearchOpen & isMobile) {
          setHeaderVisible(false);
          setBurgerButtonVisible(false);
        }
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: "white",
          color: "black",
        });
        setHeaderVisible(true);
        setBurgerButtonVisible(true);
        if (isSearchOpen && isMobile) {
          setHeaderVisible(false);
          setBurgerButtonVisible(false);
        }
      }
    }
    lastScrollTopRef.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, isSearchOpen]);

  useEffect(() => {
    getMenu();
  }, [lang]);

  if (isProjectPage || isMusicPage || isHomePage) {
    return null;
  }

  return (
    <>
      {isSlidingOut && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-in-left`}
        />
      )}
      {isSlidingOutSecond && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-out-left `}
        />
      )}

      <div
        className={`${
          selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
        }`}
      >
        <BurgerButton
          toggleDrawer={toggleDrawer}
          drawerButtonRef={drawerButtonRef}
          isDrawerOpen={isDrawerOpen}
          isSearchOpen={isSearchOpen}
          isMobile={isMobile}
          burgerButtonvisible={burgerButtonvisible}
        />
        {/* Search Field */}
        <AnimatePresence>
          {isSearchOpen && isMobile && (
            <motion.div
              className={`z-50 fixed top-5 px-4 flex justify-center items-center`}
              initial={{ width: 0 }}
              animate={{
                width: "100%",
              }}
              exit={{ width: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <IoSearch
                onClick={() => handleToggleSearch()}
                className={`cursor-pointer ${
                  selectedLanguage === "ENG" ? "rotate-0" : "rotate-90"
                }`}
                size={18}
              />
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                {selectedLanguage === "ENG" ? (
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder={selectedLanguage === "ENG" ? "SEARCH" : "يبحث"}
                    className={`w-full h-6 ${
                      selectedLanguage === "ENG" ? "pr-4 pl-1" : "pl-4 pr-1"
                    } py-1 bg-transparent border-b-[1px]  rounded-none outline-0 font-custom1 text-left text-[15px] placeholder-opacity-50 ... hide-search-clear-button`}
                  />
                ) : (
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder={selectedLanguage === "ENG" ? "SEARCH" : "يبحث"}
                    className={`w-full h-6 ${
                      selectedLanguage === "ENG" ? "pr-4 pl-1" : "pl-4 pr-1"
                    } py-1 bg-transparent border-b-[1px]  rounded-none outline-0 font-custom3 text-right text-[15px] placeholder-opacity-50 ... hide-search-clear-button`}
                    dir="rtl"
                  />
                )}
                <IoClose
                  className={`absolute bottom-[5px] ${
                    selectedLanguage === "AR" ? "left-0" : "right-0"
                  } `}
                  size={18}
                  onClick={() => dispatch(toggleSearch(false))}
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.header
          ref={headerRef}
          className={`z-50 w-full fixed top-0 flex items-center h-[73.59px] lg:h-[108px] transition-height
        `}
          dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
          initial={{ translateY: "-100%" }}
          animate={{ translateY: headerVisible ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="mx-auto w-full h-full px-3 lg:px-6 xl:px-[42px]">
            <ul className="flex items-center justify-between w-full h-full text-[13px] xl:text-[15px]">
              {/* Menu */}
              <li className="w-1/3">
                <p
                  className={`${
                    selectedLanguage === "AR"
                      ? "mr-12 sm:mr-14"
                      : "ml-12 sm:ml-14"
                  } leading-[15px] font-normal sm:font-[510] tracking-[0.08px] uppercase cursor-pointer w-fit`}
                  onClick={toggleDrawer}
                >
                  {isMobile
                    ? `${selectedLanguage === "ENG" ? "Menu" : "القائمة"}`
                    : getBreadcrumbText(pathname, selectedLanguage)}
                </p>
              </li>

              {/* Logo */}
              <li className="w-1/3 flex items-center justify-center">
                {!isAboutPage ? (
                  <Link
                    href="/"
                    onClick={closeDrawer}
                    className="relative h-[80px] xl:h-[100px] w-[80px] xl:w-[100px]"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <>
                      <Image
                        src="/images/logo.png"
                        alt="logo"
                        title="GHMZA"
                        fill
                        className={`absolute ${
                          isGifVisible ? "opacity-0" : "opacity30"
                        }`}
                      />
                      <Image
                        src="/images/logo.gif"
                        alt="hover-logo"
                        title="GHMZA"
                        fill
                        className={`absolute ${
                          isGifVisible ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </>
                  </Link>
                ) : (
                  <span className="text-[11px] sm:text-[14px] lg:text-[20.19px] xl:text-[30.19px] 2xl:text-[40.19px] 3xl:text-[50.19px] tracking-[0.16px] font-extrabold text-center uppercase">
                    What is ghmza?
                  </span>
                )}
              </li>

              <li className="w-1/3 flex items-center justify-end gap-[16px] leading-5 font-normal">
                {isHomePage && (
                  <p className="hidden md:block text-[13px] xl:text-[15px]">
                    {selectedLanguage === "AR" ? (
                      <>
                        {new Intl.DateTimeFormat("ar", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kuwait",
                        }).format(currentTime)}
                        – الكويت، الكويت (بتوقيت جرينتش)
                      </>
                    ) : (
                      <>
                        {currentTime.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                          timeZone: "Asia/Kuwait",
                        })}{" "}
                        — QIBLA, KW (GMT+3)
                      </>
                    )}
                  </p>
                )}
                <IoSearch
                  onClick={() => handleToggleSearch()}
                  className={`cursor-pointer ${
                    isSearchOpen ? "hidden" : "block"
                  }`}
                  size={18}
                />
                <AnimatePresence>
                  {isSearchOpen && !isMobile && (
                    <motion.div
                      className={`flex justify-center items-center`}
                      initial={{ width: 0 }}
                      animate={{
                        width: "200px",
                      }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex items-center justify-between"
                      >
                        <IoSearch
                          onClick={() => handleToggleSearch()}
                          className={`cursor-pointer ${
                            selectedLanguage === "ENG"
                              ? "rotate-0"
                              : "rotate-90"
                          }`}
                          size={18}
                        />
                        {selectedLanguage === "ENG" ? (
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder={
                              selectedLanguage === "ENG" ? "SEARCH" : "يبحث"
                            }
                            className={`w-full h-6 ${
                              selectedLanguage === "ENG"
                                ? "pr-4 pl-1"
                                : "pl-4 pr-1"
                            } py-1 bg-transparent border-b-[1px]  rounded-none outline-0 font-custom1 text-left text-[15px] placeholder-opacity-50 ... hide-search-clear-button`}
                          />
                        ) : (
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder={
                              selectedLanguage === "ENG" ? "SEARCH" : "يبحث"
                            }
                            className={`w-full h-6 ${
                              selectedLanguage === "ENG"
                                ? "pr-4 pl-1"
                                : "pl-4 pr-1"
                            } py-1 bg-transparent border-b-[1px] rounded-none outline-0 font-custom3 text-right text-[15px] placeholder-opacity-50 ... hide-search-clear-button`}
                            dir="rtl"
                          />
                        )}
                        <IoClose
                          className={`absolute bottom-[5px] ${
                            selectedLanguage === "AR" ? "left-0" : "right-0"
                          } `}
                          size={18}
                          onClick={() => dispatch(toggleSearch(false))}
                        />
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative" ref={languageRef}>
                  <button
                    className="cursor-pointer font-normal 2xl:tracking-[-1.25px] sm:font-[510] "
                    onClick={handleToggleLanguage}
                  >
                    {selectedLanguage === "ENG" ? "AR" : "EN"}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </motion.header>

        {/* Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <motion.div
              className={`fixed inset-0 bg-black z-50 ${
                isDrawerOpen ? "opacity-100 drawerContainer" : "opacity-0"
              }`}
              ref={drawerRef}
              style={{
                overflow: "hidden",
                overflowY: "auto",
                left: selectedLanguage === "AR" ? "unset" : "0",
                right: selectedLanguage === "AR" ? "0" : "unset",
              }}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: getDrawerWidth() }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
            >
              <div className="max-w-screen-[300px] w-full mt-[154.89px] md:mt-[180px] 2xl:mt-[195px]">
                {navItemsData.map((item, index) => (
                  <NavItem
                    key={index}
                    href={item.href}
                    text={`${item.text[selectedLanguage]}`}
                    subText={`${menu[index]?.attributes?.subName}`}
                    closeDrawer={closeDrawer}
                    getApi={getApi}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const NavItem = ({ href, text, subText, closeDrawer, getApi }) => {
  const [isHovered, setIsHovered] = useState(false);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");

  useEffect(() => {
    setLang(selectedLanguage === "ENG" ? "en" : "ar");
  }, [selectedLanguage]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = async () => {
    closeDrawer();
    getApi(lang);
  };

  return (
    <Link
      href={href}
      className={`${
        selectedLanguage === "AR"
          ? "pr-7 lg:pr-10 dashed-animation-backward text-[2.8rem] lg:text-[3rem] xl:text-[3.4rem]"
          : "pl-7 lg:pl-10  dashed-animation text-[3.43rem] xl:text-[4.45rem]"
      } relative flex items-center py-1 mb-[13.36px] md:mb-[17.07px] text-white leading-[54.08px]  2xl:leading-[68.08px] tracking-[-2.35px]  md:tracking-[-2.96px] font-bold group`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25"></div>
      <p>{text}</p>
      <sup
        className={`text-[10.31px] md:text-[12.99px] ml-1 leading-[9.89px] md:leading-[12.46px] tracking-[-0.43px] md:tracking-[-0.54px] font-[510] ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="flex gap-[1px]">
          <span>/</span>
          <span>{subText}</span>
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-25"></div>
        </div>
      </sup>
    </Link>
  );
};
export default NavBar;
