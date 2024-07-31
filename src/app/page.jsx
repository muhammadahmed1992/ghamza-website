"use client";
import React, { useEffect, useState } from "react";
import CookieConsentPopup from "@/components/CookieConsentPopup/cookieConsentPopup";
import Hero from "@/components/home/hero/Hero";
import { useSelector } from "react-redux";
import utils from "@/util/utils";
import { useRouter } from "next/navigation";

const Home = () => {
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [lang, setLang] = useState(selectedLanguage === "ENG" ? "en" : "ar");
  const [projectData, setProjectData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleRouteChangeComplete = () => {
      window.scrollTo(0, 0);
    };

    router.events?.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (selectedLanguage === "ENG") {
      setLang("en");
    } else {
      setLang("ar");
    }
  }, [selectedLanguage]);

  const getProjects = async () => {
    try {
      const response = await fetch(
        `${utils.BASE_URL}sliders?locale=${lang}&populate[documentaries][populate]=media,thumbnail&populate[films][populate]=media,thumbnail&populate[musics][populate]=media,thumbnail&populate[shows][populate]=media,thumbnail&populate[lives][populate]=media,thumbnail`,
        {
          headers: {
            Authorization: `${utils.token}`,
          },
        }
      );
      const result = await response.json();
      setProjectData(result);
    } catch (error) {
      console?.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, [lang]);

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
      <div
        dir={dir}
        className={`${language === "ENG" ? "font-custom1" : "font-custom3"}`}
      >
        <Hero projectData={projectData} />
        <CookieConsentPopup />
      </div>
    </>
  );
};

export default Home;
