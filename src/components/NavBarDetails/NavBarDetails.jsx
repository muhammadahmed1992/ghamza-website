"use client";
import "../NavBar/NavBar.css";
import Image from "next/image";
import Link from "next/link";
import navItemsData from "../NavBar/navItemsData.json";
import breadcrumbTexts from "../NavBar/breadcrumbTexts.json";
import utils from "@/util/utils";
import { useEffect, useRef, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { gsap } from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearch } from "../../redux/searchSlice";
import { selectLanguage, toggleLanguage } from "../../redux/languageSlice";
import { setSearchResults } from "@/redux/searchResultsSlice";
import { setFilmsData } from "@/redux/filmsSlice";
import { setDocumentariesData } from "@/redux/documentariesSlice";
import { setShowsData } from "@/redux/showsSlice";
import { setMusicData } from "@/redux/musicSlice";
import { setLiveShowsData } from "@/redux/liveShowsSlice";

const BurgerButtonNavDetails = ({
  toggleDrawer,
  isDrawerOpen,
  isSearchOpen,
  burgerButtonColor,
  isHomePage,
  drawerButtonRef,
  isMobile,
}) => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  return (
    <button
      ref={drawerButtonRef}
      className={`${
        selectedLanguage === "AR"
          ? "fixed top-[13px] lg:top-[31px] right-4 lg:right-8 xl:right-12 z-[999]"
          : "fixed top-[13px] lg:top-[31px] left-4 lg:left-8 xl:left-12 z-[999]"
      } ${isSearchOpen && isMobile ? "opacity-0" : "opacity-100"} ${
        isHomePage ? "mix-blend-difference text-white" : ""
      } group
        `}
      style={{
        width: "36px",
        height: "36px",
      }}
      onClick={toggleDrawer}
    >
      <div className={`w-6 sm:w-8 h-[1px] relative mx-auto cursor-pointer`}>
        <span
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full 
             transition duration-300  bg-${burgerButtonColor}
              ${
                isDrawerOpen
                  ? "rotate-45 mt-[10px] bg-white"
                  : "rotate-0 group-hover:-mt-[1px]"
              }
              `}
        ></span>
        <span
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full rounded-full 
            transition duration-300 mt-[10px] bg-${burgerButtonColor}
              ${
                isDrawerOpen
                  ? "-rotate-45 bg-white"
                  : "rotate-0 group-hover:mt-[11px]"
              }`}
        ></span>
      </div>
    </button>
  );
};

const NavBarDetails = () => {
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVerticleSilder, setIsVerticleSilder] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGifVisible, setIsGifVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "ar" : "en");
  const [menu, setMenu] = useState();
  const [logoImg, setLogoImg] = useState("logo");
  const [burgerButtonColor, setBurgerButtonColor] = useState("black");
  const [burgerButtonvisible, setBurgerButtonVisible] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [isSlidingOutSecond, setIsSlidingOutSecond] = useState(false);

  const isHomePage = pathname === "/";
  const path = "/searchResults";
  var currentScrollTop = 0;

  const drawerButtonRef = useRef(null);
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
    };
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

  useEffect(() => {
    setLang(selectedLanguage === "ENG" ? "ar" : "en");
  }, [selectedLanguage]);

  const handleMouseEnter = () => setIsGifVisible(true);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsGifVisible(false);
    }, 3000);
  };

  function scrollToTop() {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }
  const handleToggleSearch = () => {
    if (currentScrollTop > 720) {
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

  const handleSearchInputChange = (event) => setSearchQuery(event.target.value);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    dispatch(setSearchResults([]));
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
      if (currentScrollTop > 720) {
        scrollToTop();
        dispatch(toggleSearch(false));
      } else {
        scrollToTop();
        dispatch(toggleSearch(true));
        if (isSearchOpen) {
          setHeaderVisible(true);
        } else {
          setHeaderVisible(false);
        }
        dispatch(toggleSearch(false));
      }
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
        setLogoImg("logo");
        setBurgerButtonColor("black");
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
        if (isSearchOpen && isMobile) {
          setHeaderVisible(false);
          setBurgerButtonVisible(false);
        }
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: "transparent",
          color: "white",
        });
        setBurgerButtonVisible(true);
        setLogoImg("logoWhite");
        setBurgerButtonColor("white");
        setHeaderVisible(true);

        if (isSearchOpen && isMobile) {
          setHeaderVisible(false);
          setBurgerButtonVisible(false);
        }
      }
    }
    lastScrollTopRef.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth <= 640);
      setIsTablet(screenWidth <= 1140);
      setIsVerticleSilder(screenWidth > 1024);
    };
    handleResize();
    gsap.to(headerRef.current, {
      backgroundColor: "transparent",
      color: "white",
    });
    setLogoImg("logoWhite");
    setBurgerButtonColor("white");

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    getMenu();
  }, [lang]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isSearchOpen]);

  if (isModalOpen) {
    return null;
  }

  return (
    <>
      {isSlidingOut && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-in-left `}
        ></div>
      )}
      {isSlidingOutSecond && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] slide-out-left`}
        ></div>
      )}

      <div
        className={`${
          selectedLanguage === "ENG" ? "font-custom1" : "font-custom3"
        }`}
      >
        <BurgerButtonNavDetails
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          isSearchOpen={isSearchOpen}
          isHomePage={isHomePage}
          isMobile={isMobile}
          drawerButtonRef={drawerButtonRef}
          burgerButtonColor={burgerButtonColor}
          burgerButtonvisible={burgerButtonvisible}
        />
        {/* Search Field */}
        <AnimatePresence>
          {isSearchOpen && isMobile && (
            <motion.div
              className={`z-50 fixed top-5 px-4 flex justify-center items-center ${
                isHomePage ? "mix-blend-difference text-white" : ""
              }`}
              initial={{ width: 0 }}
              animate={{
                width: "100%",
              }}
              exit={{ width: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
            >
              <IoSearch
                onClick={() => handleToggleSearch()}
                className={`cursor-pointer text-white ${
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
                    } py-1 bg-transparent border-b-[1px]  rounded-none outline-0 font-custom1 text-white text-left text-[15px] placeholder-[#fff] placeholder-opacity-50 ... hide-search-clear-button`}
                  />
                ) : (
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder={selectedLanguage === "ENG" ? "SEARCH" : "يبحث"}
                    className={`w-full h-6 ${
                      selectedLanguage === "ENG" ? "pr-4 pl-1" : "pl-4 pr-1"
                    } py-1 bg-transparent border-b-[1px]  rounded-none outline-0 font-custom3 text-white text-right text-[15px] placeholder-[#fff] placeholder-opacity-50 ... hide-search-clear-button`}
                    dir="rtl"
                  />
                )}
                <IoClose
                  className={`absolute bottom-[5px] text-white ${
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
          className={`z-50 w-full
          fixed top-0 flex items-center h-[73.59px] lg:h-[108px] transition-height ${
            isHomePage ? "mix-blend-difference text-white" : ""
          }
        `}
          dir={`${selectedLanguage === "ENG" ? "ltr" : "rtl"}`}
          initial={{ translateY: "-100%" }}
          animate={{ translateY: headerVisible ? "0%" : "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="mx-auto w-full px-3 lg:px-6 xl:px-[42px] py-2">
            <ul className="flex items-center justify-between w-full text-[13px] xl:text-[15px]">
              {/* Menu */}
              <li className="w-1/3 xl:w-[45%]">
                <p
                  className={`${
                    selectedLanguage === "AR"
                      ? "mr-12 sm:mr-14"
                      : "ml-12 sm:ml-14"
                  } leading-[15px] tracking-[0.08px] font-normal sm:font-[510] uppercase cursor-pointer w-fit`}
                  onClick={toggleDrawer}
                >
                  {isMobile
                    ? `${selectedLanguage === "ENG" ? "Menu" : "القائمة"}`
                    : getBreadcrumbText(pathname, selectedLanguage)}
                </p>
              </li>

              {/* Logo */}
              <li className="w-1/3 xl:w-[10%] flex items-center justify-center">
                <Link
                  href="/"
                  className="relative  h-[80px] xl:h-[100px] w-[80px] xl:w-[100px]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <>
                    <Image
                      src={`/images/${logoImg}.png`}
                      alt="logo"
                      title="GHMZA"
                      fill
                      className={`absolute ${
                        isGifVisible ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <Image
                      src={`/images/${logoImg}.gif`}
                      alt="hover-logo"
                      title="GHMZA"
                      fill
                      className={`absolute ${
                        isGifVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </>
                </Link>
              </li>

              <li className="w-1/3 xl:w-[45%] flex items-center justify-end gap-[16px] leading-5 font-normal">
                {isHomePage && (
                  <p className="hidden xl:block text-[13px] xl:text-[15px] ">
                    {selectedLanguage === "AR" ? (
                      <>
                        {new Intl.DateTimeFormat("ar", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          timeZone: "Asia/Kuwait",
                        }).format(currentTime)}{" "}
                        – الكويت، القبلة (جرينتش)
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
                            } py-1 bg-transparent border-b-[1px] border-white rounded-none outline-0 font-custom1 text-white text-left text-[15px] placeholder-[#fff] placeholder-opacity-50 ... hide-search-clear-button`}
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
                            } py-1 bg-transparent border-b-[1px] border-white rounded-none outline-0 font-custom3 text-white text-right text-[15px] placeholder-[#fff] placeholder-opacity-50 ... hide-search-clear-button`}
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
              ref={drawerRef}
              className={`fixed inset-0 bg-black z-50 ${
                isDrawerOpen ? "opacity-100 drawerContainer" : "opacity-0"
              }`}
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
                    setIsSlidingOut={setIsSlidingOut}
                    setIsSlidingOutSecond={setIsSlidingOutSecond}
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

const NavItem = ({
  href,
  text,
  subText,
  closeDrawer,
  getApi,
  setIsSlidingOut,
  setIsSlidingOutSecond,
}) => {
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
    setIsSlidingOut(false);
    setIsSlidingOutSecond(false);
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
export default NavBarDetails;
