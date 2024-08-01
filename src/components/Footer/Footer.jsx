"use client";
import { useDispatch, useSelector } from "react-redux";
import footerTexts from "./footerTexts.json";
import { useEffect, useState } from "react";
import utils from "@/util/utils";
import { usePathname } from "next/navigation";
import { setContactInfo } from "@/redux/contactSlice";
import Link from "next/link";
import { setJoinUsInfo } from "@/redux/joinUsSlice";

const Footer = () => {
  const pathname = usePathname();
  const isAppPage = pathname === "/newApp";
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const [dir, setDir] = useState(selectedLanguage === "ENG" ? "ltr" : "rtl");
  const [language, setLanguage] = useState(selectedLanguage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDir(selectedLanguage === "ENG" ? "ltr" : "rtl");
      setLanguage(selectedLanguage);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState();

  const texts = footerTexts[language];

  const lang = selectedLanguage === "AR" ? "ar" : "en";

  const fetchFooterData = async () => {
    var id = "1";
    if (lang == "en") {
      id = "1";
    } else {
      id = "2";
    }
    try {
      const response = await fetch(
        `${utils.BASE_URL}footers/${id}?locale=${lang}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${utils.token}`,
          },
        }
      );

      const result = await response.json();
      setFooterData(result?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // throw error;
    }
  };

  useEffect(() => {
    fetchFooterData();
  }, [lang]);

  const dispatch = useDispatch();

  let titleEng = "LETS CATCH UP AND TALK ABOUT YOU!";
  let joinUsTitleEng = "ARE YOU THE MISSING PIECE💼 WE ARE LOOKING FOR!!";
  let titleAr = "دعونا اللحاق والتحدث عنك!";
  let joinUsTitleAr = "هل أنت القطعة المفقودة💼 التي نبحث عنها!!"

  const handleLetsTalkClick = (event) => {
    event.preventDefault();
    dispatch(setContactInfo({ titleEng, titleAr}));
  };

  const handleJoinUsClick = (event) => {
    event.preventDefault();
    dispatch(setJoinUsInfo({ joinUsTitleEng, joinUsTitleAr}));
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleValidateEmail = () => {
    if (!validateEmail(email)) {
      setEmailError("Please provide a valid email address");
    } else {
      setEmailError("");
    }
    if (!email) {
      setEmailError("");
    }
  };

  if (isAppPage) {
    return null;
  }
  return (
    <>
      <footer
        dir={dir}
        className={`bg-black ${
          language === "ENG" ? "font-custom1" : "font-custom3"
        }`}
      >
        <div className="mx-auto max-w-screen-[1400px] px-6 lg:px-8 xl:px-12 pt-[59px] pb-[27px] ">
          <div className="grid gap-8 grid-cols-2">
            {/* First grid item */}
            <div className="flex justify-between gap-4 col-span-2 lg:col-span-1">
              <div className="uppercase text-white text-[11.34px] md:text-[13.95px] leading-4 font-bold">
                <ul className="font-normal md:font-bold">
                  <li className="mb-[6px] md:mb-[8px]" 
                    onClick={handleJoinUsClick}
                  >  
                    <Link href="/job" className="hover:underline">
                      {texts?.links?.jobs}
                    </Link>
                  </li>
                  <li className="mb-[6px] md:mb-[8px]">
                    <a
                      href="https://75c1a3-66.myshopify.com/"
                      className="hover:underline"
                    >
                      {texts?.links?.shop}
                    </a>
                  </li>
                  <li className="hidden md:block mb-[6px] md:mb-[8px]">
                    <a href="/newApp" className="hover:underline">
                      {texts?.links?.app}
                    </a>
                  </li>
                  <li className="mb-9">
                    <a href="/secret" className="hover:underline">
                      {texts?.links?.secret}
                    </a>
                  </li>
                  <li className="mb-[6px] md:mb-[8px]">
                    <a href="/about" className="hover:underline">
                      {texts?.links?.AboutUS}
                    </a>
                  </li>
                  <li
                    className="mb-[6px] md:mb-[8px]"
                    onClick={handleLetsTalkClick}
                  >
                    <Link href="/contact" className="hover:underline">
                      {texts?.links?.letsTalk}
                    </Link>
                  </li>
                  <li className="mb-[6px] md:mb-[8px]">
                    <a href="/privacyPolicy" className="hover:underline">
                      {texts?.links?.privacyPolicy}
                    </a>
                  </li>
                  <li className="mb-9">
                    <a href="/termsOfUse" className="hover:underline">
                      {texts?.links?.termsOfUse}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="border-t-2 w-1/2 border-gray-300 text-white uppercase text-[11.34px] md:text-[13.95px] leading-4 font-bold">
                <h2 className="mb-[48px] md:leading-4 tracking-[0.38px] md:tracking-[-0.08px] text-[11.15px] md:text-[13.95px] font-bold">
                  {texts?.socials?.socialsText}
                </h2>

                {footerData?.attributes?.links?.links?.map((item, index) => (
                  <ul key={index} className="font-normal md:font-bold">
                    <li className="mb-[6px] md:mb-2">
                      <a
                        href={item?.url}
                        target="_blank"
                        className="hover:underline"
                      >
                        {item?.name}
                      </a>
                    </li>
                  </ul>
                ))}
              </div>
            </div>

            {/* second grid item */}
            <div className="col-span-2 lg:col-span-1">
              <div className="border-t-2 border-gray-300 text-white text-[11.15px] md:text-[13.95px] leading-4 font-bold">
                <h2 className="mb-5 md:mb-10 uppercase leading-4 tracking-[-0.08px] font-bold">
                  {texts?.moreGhamza}
                </h2>
                <ul className="font-bold">
                  <li>
                    <p className="mb-6 font-normal md:font-bold text-[12px] md:text-[17.86px] leading-[13px] md:leading-[23.94px] tracking-[-0.22px]">
                      {texts?.getEmails}
                    </p>
                  </li>
                  <li>
                    <div className="flex relative">
                      <input
                        type="email"
                        // placeholder={texts?.emailPlaceholder}
                        value={email}
                        onChange={handleEmailChange}
                        className={`bg-black w-full h-[63px] p-4 border rounded-none outline-none relative text-[14px] font-normal leading-[16px] ${
                          emailError ? "border-red-500" : ""
                        }`}
                      />
                      <label
                        htmlFor=""
                        className="uppercase text-white text-[7.8px] font-bold absolute top-[9px] left-[16px]"
                      >
                        Email
                      </label>
                      <button  onClick={handleValidateEmail} className="bg-white text-[10.95px] rounded-none md:text-[14.3px] font-bold md:font-normal leading-4 tracking-[0.08px] text-black w-48 text-gray-900 p-4 uppercase">
                        {texts?.signUp}
                      </button>
                    </div>
                    {emailError && (
                      <p className="uppercase text-red-500 text-[10px] mt-1">
                        {emailError}
                      </p>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Footer text */}
          <p className="text-white uppercase text-center text-[14px] leading-6 font-normal tracking-[-0.22px] sm:text-left mt-10 md:mt-0">
            © {currentYear} Ghmza<span> - </span>
            <a className="underline" href="mailto:HI@GHMZA.COM">
              HI@GHMZA.COM
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
