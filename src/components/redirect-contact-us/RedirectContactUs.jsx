import { setContactInfo } from "@/redux/contactSlice";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactUs = (props) => {
  const { titleEng, titleAr, subTitleEng, subTitleAr } = props;
  

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );

  const dispatch = useDispatch();

  const handleQueryClick = () => {
    dispatch(setContactInfo({ titleEng, titleAr, subTitleEng, subTitleAr }));
  };

  const toCamelCase = (sentence) => {
    const lowerCaseSentence = sentence.toLowerCase();
    const camelCaseSentence = lowerCaseSentence
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toUpperCase() : match.toUpperCase()
      )
      .replace(/\s+/g, ' ');
  
    return camelCaseSentence;
  };

  const [language, setLanguage] = useState(selectedLanguage);

  // Use useMemo to avoid recalculating on every render
  const title = useMemo(() => {
    return language === "ENG" ? toCamelCase(titleEng) : titleAr;
  }, [language, titleEng, titleAr, toCamelCase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLanguage(selectedLanguage);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  return (
    <div onClick={handleQueryClick} className="relative group">
      <Link
        href="/contact"
        className={`${
          language === "ENG" ? "font-custom1" : "pr-[18px] font-custom3"
        } cursor-pointer md:border-black md:border-t-[0.5px] md:border-b-[0.5px] pl-[12px] pr-[12px] flex justify-between items-center relative overflow-hidden group`}
      >
        <div className="flex flex-col justify-center items-start ">
          <p
            className={`transition delay-100 text-black pt-[5px] md:pt-[10px] lg:pt-[12px] xl:pt-[15px] font-[600] md:font-bold 
             ${
              title.includes("Live") ||  title.includes("فعالية") 
                ? `${
              language === "ENG"
                ? "2xl:leading-[90px] xl:leading-[54px] leading-[27px] lg:leading-[44px] md:leading-[36px] text-[29px] md:text-[40px] lg:text-[50px] xl:text-[67.9px] 2xl:text-[96px] tracking-[-2.15px] md:tracking-[-3px] lg:tracking-[-4.15px] xl:tracking-[-5px] 2xl:tracking-[-7.15px]"
                : "2xl:leading-[90px] xl:leading-[64px] leading-[36px] lg:leading-[52px] md:leading-[42px] text-[36px] md:text-[45px] lg:text-[54px] xl:text-[70px] 2xl:text-[100px] tracking-[-1.15px] md:tracking-[-2px] lg:tracking-[-3.15px] xl:tracking-[-4px] 2xl:tracking-[-6.15px]"
            }`
                : ""
            }${
              title.includes("Track") ||  title.includes("أغنية") 
                ? `${
              language === "ENG"
                ? "2xl:leading-[90px] xl:leading-[54px] leading-[22px] md:leading-[36px] lg:leading-[46px] text-[24px] md:text-[38.5px] lg:text-[50.81px] xl:text-[67.9px] 2xl:text-[96px] tracking-[-2.15px] md:tracking-[-2.87px] lg:tracking-[-3.78px] xl:tracking-[-5.06px] 2xl:tracking-[-7.15px]"
                : "2xl:leading-[90px] xl:leading-[64px] leading-[40px] lg:leading-[52px] md:leading-[42px] text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[100px] tracking-[-1.15px] md:tracking-[-1px] lg:tracking-[-1.5px] xl:tracking-[-2px] 2xl:tracking-[-2.5px]"
            }`
                : ""
            } ${
              title.includes("Film") || title.includes("فيلم")
                ? `${
              language === "ENG"
                ? "2xl:leading-[72px] xl:leading-[44px] leading-[27px] md:leading-[36px] lg:leading-[40px] text-[33px] md:text-[40px] lg:text-[50.81px] xl:text-[67.9px] 2xl:text-[96px] tracking-[-2.15px] md:tracking-[-3px] lg:tracking-[-3.85px] xl:tracking-[-4.7px] 2xl:tracking-[-7px]"
                : "2xl:leading-[90px] xl:leading-[64px] leading-[40px] lg:leading-[52px] md:leading-[42px] text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[100px] tracking-[-1.75px] md:tracking-[-2px] lg:tracking-[-3px] xl:tracking-[-5px] 2xl:tracking-[-7px]"
            }`
                : ""
            }
            ${
              title.includes("Show")  || title.includes("برنامج")
                ? ` ${
              language === "ENG"
                ? "2xl:leading-[72px] xl:leading-[44px] leading-[27px] md:leading-[36px] lg:leading-[40px] text-[33px] md:text-[40px] lg:text-[50.81px] xl:text-[67.9px] 2xl:text-[96px] tracking-[-2.15px] md:tracking-[-3px] lg:tracking-[-3.85px] xl:tracking-[-4.7px] 2xl:tracking-[-7px]"
                : "2xl:leading-[90px] xl:leading-[64px] leading-[40px] lg:leading-[52px] md:leading-[42px] text-[40px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[100px] tracking-[-1.75px] md:tracking-[-2px] lg:tracking-[-3px] xl:tracking-[-5px] 2xl:tracking-[-7px]"
            }`
                : ""
            }
             ${
              title.includes("Documentary")  || title.includes("وثائقي")
                ? ` ${
              language === "ENG"
                ? "2xl:leading-[72px] xl:leading-[40px] leading-[24px] md:leading-[36px] lg:leading-[32px] text-[26px] md:text-[38.5px] lg:text-[50.81px] xl:text-[67.9px] 2xl:text-[96px] tracking-[-2.15px] md:tracking-[-2.87px] lg:tracking-[-3.78px] xl:tracking-[-5.06px] 2xl:tracking-[-6.5px]"
                : "2xl:leading-[90px] xl:leading-[64px] leading-[40px] lg:leading-[52px] md:leading-[42px] text-[28px] md:text-[50px] lg:text-[60px] xl:text-[70px] 2xl:text-[100px] tracking-[-1.75px] md:tracking-[-2px] lg:tracking-[-3px] xl:tracking-[-5px] 2xl:tracking-[-7px]"
            }`
                : ""
            }  m-0 p-0 group-hover:text-white`}
          >
            {title}
          </p>
          <p
            className={`lowercase transition delay-100 xl:pl-[4px] md:mt-0 text-black font-[400] lg:font-[510] m-0 p-0 group-hover:text-white md:mb-[10px]  
              ${
              title.includes("Live") ||  title.includes("فعالية") 
               ? ` ${
              language === "ENG"
                ? "2xl:leading-[55px] xl:leading-[50px] md:leading-[30px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px] tracking-[-1px] md:tracking-[-1.1px]  lg:tracking-[-1.46px] xl:tracking-[-1.95px]  2xl:tracking-[-2.75px]"
                : "2xl:leading-[64px] xl:leading-[54px] md:leading-[40px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px] tracking-[-1px] md:tracking-[-1.2px]  lg:tracking-[-1.4px] xl:tracking-[-1.75px]  2xl:tracking-[-2.75px]"
            }`
               : ""
            }
             ${
              title.includes("Track") ||  title.includes("أغنية")
               ? ` ${
              language === "ENG"
                ? "2xl:leading-[55px] xl:leading-[50px] md:leading-[30px] leading-[25px] text-[18px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.46px] xl:tracking-[-1.95px] 2xl:tracking-[-2.65px]"
                : "2xl:leading-[64px] xl:leading-[54px] md:leading-[40px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px] tracking-[-1px] md:tracking-[-1.2px]  lg:tracking-[-1.4px] xl:tracking-[-1.75px] 2xl:tracking-[-2.75px]"
            }`
               : ""
            }
             ${
              title.includes("Film") || title.includes("فيلم")
               ? ` ${
              language === "ENG"
                ? "2xl:leading-[55px] xl:leading-[50px] md:leading-[30px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.46px] xl:tracking-[-1.95px] 2xl:tracking-[-2.65px]"
                : "2xl:leading-[64px] xl:leading-[54px] md:leading-[40px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px]  tracking-[-1px] md:tracking-[-1.2px]  lg:tracking-[-1.4px] xl:tracking-[-1.75px] 2xl:tracking-[-2.75px]"
            }`
               : ""
            }
             ${
              title.includes("Show")  || title.includes("برنامج")
               ? ` ${
              language === "ENG"
                ? "2xl:leading-[55px] xl:leading-[50px] md:leading-[30px] leading-[25px] text-[18px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px]  tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.46px] xl:tracking-[-1.95px] 2xl:tracking-[-2.65px]"
                : "2xl:leading-[64px] xl:leading-[54px] md:leading-[40px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px]  tracking-[-1px] md:tracking-[-1.2px]  lg:tracking-[-1.4px] xl:tracking-[-1.75px] 2xl:tracking-[-2.75px]"
            }`
               : ""
            }
             ${
              title.includes("Documentary")  || title.includes("وثائقي")
               ? ` ${
              language === "ENG"
                ? "2xl:leading-[50px] xl:leading-[46px] md:leading-[30px] leading-[20px] text-[16.99px] md:text-[22.42px] xl:text-[29.96px] 2xl:text-[40.36px] tracking-[-1px] md:tracking-[-1.1px] lg:tracking-[-1.46px] xl:tracking-[-1.95px] 2xl:tracking-[-2.65px]"
                : "2xl:leading-[64px] xl:leading-[54px] md:leading-[40px] leading-[25px] text-[22px] md:text-[30.36px] xl:text-[36.36px] 2xl:text-[42.36px]   tracking-[-1px] md:tracking-[-1.2px]  lg:tracking-[-1.4px] xl:tracking-[-1.75px] 2xl:tracking-[-2.75px]"
            }`
               : ""
            }
            `}
          >
            {language === "ENG" ? subTitleEng : subTitleAr}
          </p>
        </div>
        <svg
          className="mr-[36px] md:w-[102px] lg:w-[122px] xl:w-[142px] 2xl:w-[162px] hidden md:block fill-current text-black hover:text-white group-hover:text-white delay-[100ms] transition-all duration-500 ease-in-out group-hover:w-[150px]"
          viewBox="0 0 57 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 9.64453C1.17157 9.64453 0.5 10.3161 0.5 11.1445C0.5 11.973 1.17157 12.6445 2 12.6445L2 9.64453ZM56.0607 12.2052C56.6464 11.6194 56.6464 10.6697 56.0607 10.0839L46.5147 0.537933C45.9289 -0.0478534 44.9792 -0.0478535 44.3934 0.537933C43.8076 1.12372 43.8076 2.07347 44.3934 2.65925L52.8787 11.1445L44.3934 19.6298C43.8076 20.2156 43.8076 21.1653 44.3934 21.7511C44.9792 22.3369 45.9289 22.3369 46.5147 21.7511L56.0607 12.2052ZM2 12.6445L55 12.6445L55 9.64454L2 9.64453L2 12.6445Z" />
        </svg>
        <div className="z-[-1] absolute inset-0 bg-pink transition duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100"></div>
      </Link>
    </div>
  );
};

export default ContactUs;
