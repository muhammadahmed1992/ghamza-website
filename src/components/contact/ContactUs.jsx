"use client";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import utils from "@/util/utils";
import { motion } from "framer-motion";
import "./style.css";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { BsUpload } from "react-icons/bs";
import {
  defaultCountries,
  parseCountry,
  PhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";

import { Select } from "antd";

const ContactUs = () => {
  const contactInfo = useSelector((state) => state.contact);
  const isSearchOpen = useSelector((state) => state.search.isSearchOpen);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const topicsList = [
    { en: "SHOWS", ar: "عروض" },
    { en: "LIVE SHOWS", ar: "عروض مباشرة" },
    { en: "FILMS", ar: "أفلام" },
    { en: "MUSIC", ar: "موسيقى" },
    { en: "DOCUMENTARIES", ar: "الافلام الوثائقية" },
    { en: "SHOP INQUIRIES", ar: "استفسارات المتجر" },
    { en: "OTHER", ar: "آخر" },
  ];

  const [customTopic, setCustomTopic] = useState("");

  const [dir, setDir] = useState(selectedLanguage === "ENG" ? "ltr" : "rtl");
  const [language, setLanguage] = useState(selectedLanguage);

  useEffect(() => {
    document.title = "CONTACT | GHMZA";
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDir(selectedLanguage === "ENG" ? "ltr" : "rtl");
      setLanguage(selectedLanguage);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedLanguage]);

  const handleChangeT = (value) => {
    console.log(`selected ${value}`);
    const updatedTopics = formData.topics.includes(topic)
      ? formData.topics.filter((t) => t !== topic)
      : [...formData.topics, topic];
    setFormData({ ...formData, topics: updatedTopics });
    console.log("data_", formData?.topics);
  };
  const handleChangeTopic = (topic) => {
    // const updatedTopics = formData.topics.includes(topic)
    //   ? formData.topics.filter((t) => t !== topic)
    //   : [...formData.topics, topic];
    setFormData({ ...formData, topics: topic });
    if (topic.length) {
      setErrors((prev) => ({ ...prev, topics: "" }));
    } else {
      setErrors((prev) => ({ ...prev, topics: "Topics are required" }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const topic = customTopic.trim();
      if (topic && !formData.topics.includes(topic)) {
        setFormData({ ...formData, topics: [...formData.topics, topic] });
        setCustomTopic("");
      }
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topics: [],
    description: "",
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const options = [];
  for (let i = 0; i < topicsList.length; i++) {
    options.push({
      value: topicsList[i].en,
      label: topicsList[i].en,
    });
    // setFormData({ ...formData, topics: [...formData.topics, topic] });
  }
  const handleFileChange = (e) => {
    if (e.target.files[0] && e.target.files[0].size > 25 * 1024 * 1024) {
      setErrorMessage("File size exceeds 25 MB");
      e.target.value = null;
    } else {
      setErrorMessage("");
      setFile(e.target.files[0]);
      setFileName(e.target.files[0]?.name || "");
      // Proceed with the file upload }
    }
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      console.log("data_", formData);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (formData.topics.length === 0) {
      errors.topics = "Topics is required";
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = "Project description is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("data", JSON.stringify(formData));
      if (file) {
        formDataToSend.append("files.media", file);
      }

      const response = await fetch(`${utils.BASE_URL}/helps`, {
        method: "POST",
        headers: {
          Authorization: `${utils.token}`,
        },
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("Success:", result);

      setFormData({
        name: "",
        phone: "",
        topics: [],
        email: "",
        description: "",
      });
      setFile(null);
      setFileName("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(formData);

  return (
    <div
      dir={dir}
      className={`contactContainer border-t-[1px] flex flex-col  lg:flex-row w-full  px-5 lg:px-10 pt-[20px]   2xl:pt-[54px] pb-8 2xl:pb-16
      ${isSearchOpen ? "" : "mt-[73.59px] lg:mt-[108px]"}
      ${language === "ENG" ? "font-custom1" : "font-custom3"}
    `}
    >
      <div className="right w-full lg:w-1/2 flex flex-col justify-between ">
        <div className="">
          {" "}
          <motion.div
            viewport={{ once: "true" }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
              },
            }}
            initial={{
              opacity: 0,
              y: 50,
            }}
          >
            <h1
              className={`font-[860] lg:mb-[168px] tracking-[-2.26px] uppercase text-center lg:text-left ${
                language === "ENG" ? "lg:text-left" : "lg:text-right"
              } text-[53.13px] sm:text-[70px] md:text-[85.19px] xl:text-[100.62px]`}
            >
              {language === "ENG" ? "Contact" : "اتصال"}
            </h1>
          </motion.div>
          <div className="uppercase hidden max-w-[400px] xl:max-w-[520px] 2xl:max-w-[553px] lg:block text-[17.78px] md:text-[24.78px] xl:text-[40.21px] ">
            <motion.div
              viewport={{ once: "true" }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                },
              }}
              initial={{
                opacity: 0,
                y: 50,
              }}
            >
              <p className="font-bold tracking-[-1.26px] leading-[37.81px] ">
                {language === "ENG"
                  ? contactInfo.titleEng
                  : contactInfo.titleAr}
              </p>
            </motion.div>
            <motion.div
              viewport={{ once: "true" }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                },
              }}
              initial={{
                opacity: 0,
                y: 50,
              }}
            >
              <p className=" font-normal tracking-[-1.26px] leading-[37.81px]">
                {language === "ENG"
                  ? contactInfo.subTitleEng
                  : contactInfo.subTitleAr}
              </p>
            </motion.div>
          </div>
        </div>

        <div className=" hidden md:flex justify-between lg:justify-start gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-normal uppercase text-[10.31px] lg:text-[14.87px] text-[#757575] tracking-[-0.24px] lg:tracking-[-0.35px] leading-[12px] lg:leading-[17.28px]">
              {language === "ENG"
                ? "Business enquiries"
                : "الاستفسارات التجارية"}
            </span>
            <span className="font-normal uppercase text-[12px] lg:text-[16.95px] text-[#2A2A2A] tracking-[-0.38px] leading-[19.2px]">
              <a className="animated-link" href="mailto:HI@GHMZA.COM">
                HI@GHMZA.COM
              </a>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-normal uppercase text-[10.31px] lg:text-[14.87px] text-[#757575] tracking-[-0.24px] lg:tracking-[-0.35px] leading-[12px] lg:leading-[17.28px]">
              {language === "ENG" ? "Open Positions" : "المناصب المفتوحة"}
            </span>
            <span className="font-normal uppercase text-[12px] lg:text-[16.95px] text-[#2A2A2A] tracking-[-0.38px] leading-[19.2px]">
              <a className="animated-link" href="mailto:JOBS@GHMZA.COM">
                JOBS@GHMZA.COM
              </a>
            </span>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="right flex flex-col justify-center md:flex-row w-full  lg:w-1/2"
      >
        <div className="w-full flex flex-col justify-between gap-3  ">
          <div>
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
              {/* Name input field Start*/}
              <div className="relative group border-b-[1px] w-full lg:w-1/2 border-gray mb-5 lg:mb-2">
              <input
              type="text"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              onBlur={() => {
               if (!formData.name) {
               setErrors((prev) => ({
                   ...prev,
                 name: "Name is required",
               }));
               }
              }}
             className="peer h-full w-full bg-transparent pt-3 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
             style={{ fontSize: "16px", touchAction: "manipulation" }}
          />
        <label
           className={`pointer-events-none absolute ${
           language === "ENG" ? "left-0" : "right-0"
           } -top-0.5 flex h-full w-full select-none uppercase !overflow-visible truncate text-[10px] font-normal leading-tight text-black transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:transition-transform after:duration-300 peer-placeholder-shown:text-[12px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-black peer-focus:text-[10px] peer-focus:leading-tight peer-focus:text-gray peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-black`}
         style={{ fontSize: "12px", textTransform: "uppercase" }}
        >
          {language === "ENG" ? "Name*" : "الاسم"}
        </label>
        <div className="absolute inset-x-0 bottom-0 h-[0.8px] bg-black transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100"></div>
        {errors.name && (
       <span className="text-red-500 text-xs uppercase absolute left-0 bottom-[-20px]">
          {errors.name}
        </span>
      )}
    </div>

              {/* Name input field End...*/}

              {/* Email input field Start*/}
              <div className="relative group border-b-[1px] w-full lg:w-1/2 border-gray mb-4 lg:mb-2">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => {
                    if (!formData.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "Email is required",
                      }));
                    }
                  }}
                  className="peer h-full w-full bg-transparent pt-3 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  style={{ fontSize: "16px", touchAction: "manipulation" }}
               />
                <label
                  className={`pointer-events-none absolute ${
                    language === "ENG" ? "left-0" : "right-0"
                  } -top-0.5 flex h-full w-full select-none uppercase !overflow-visible truncate text-[10px] font-normal leading-tight text-black transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:transition-transform after:duration-300 peer-placeholder-shown:text-[12px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-black peer-focus:text-[10px] peer-focus:leading-tight peer-focus:text-gray peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-black`}
                  style={{ fontSize: "12px", textTransform: "uppercase" }}
                >
                  {language === "ENG" ? "Email*" : "البريد الإلكتروني"}
                </label>
                <div className="absolute inset-x-0 bottom-0 h-[0.8px] bg-black transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                {errors.email && (
                  <span className="text-red-500 text-xs uppercase absolute left-0 bottom-[-20px]">
                    {errors.email}
                  </span>
                )}
              </div>
              {/* Email input field End...*/}
            </div>

            <div className="flex mt-[10px] pt-[10px] xl:mt-[15px] 2xl:mt-[64px] flex-col lg:flex-row items-end lg:gap-8 gap-0 ">
              {/* Topics dropdown field Start*/}
              <div className="border-b-[1px] w-full lg:w-1/2 border-gray mb-4 lg:mb-2 relative group">
                <div className="flex relative">
                  <Select
                    mode="tags"
                    style={{
                      width: "100%",
                      zIndex: "2",
                      border: "none !important",
                      backgroundColor: "transparent !important",
                      textTransform: "uppercase",
                      outline: "none !important",
                      fontSize: "9px",
                      touchAction: "manipulation"
                    }}
                    onChange={handleChangeTopic}
                    onBlur={() => {
                      if (!formData.topics.length) {
                        setErrors((prev) => ({
                          ...prev,
                          topics: "Topics are required",
                        }));
                      }
                    }}
                    tokenSeparators={[","]}
                    options={options}
                    dropdownStyle={{
                      backgroundColor: "transparent !important",
                      border: "none !important",
                      outline: "none !important",
                    }}
                  />
                  <MdArrowDropDown
                    className={`-mr-1 h-5 w-5 text-gray-400 absolute z-[1] cursor-pointer  ${
                      language === "ENG" ? "right-[0px]" : "left-0"
                    } `}
                    aria-hidden="true"
                  />
                </div>
                <label
                  className={`pointer-events-none absolute ${
                    language === "ENG" ? "left-0" : "right-0"
                  } -top-4 text-[14px]`}
                  style={{ fontSize: "12px", textTransform: "uppercase" }}
                >
                  {language === "ENG" ? "Topics*" : "المواضيع*"}
                </label>
                <div className="absolute inset-x-0 bottom-0 h-[0.8px] bg-black transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                {errors.topics && (
                  <span className="text-red-500 uppercase text-xs absolute left-0 bottom-[-20px]">
                    {errors.topics}
                  </span>
                )}
              </div>
              {/* Topics dropdown field End...*/}

              {/* Phone Number input field Start*/}

              <div
                className="border-b-[1px] w-full lg:w-1/2 border-gray mb-4 lg:mb-2 relative group"
                dir="ltr"
              >
                <PhoneInput
                  defaultCountry="kw"
                  country="kw"
                  name="phone"
                  value={formData.phone}
                  onChange={(phone) =>
                    setFormData({ ...formData, phone: phone || "" })
                  }
                  onBlur={() => {
                    if (!formData.phone) {
                      setErrors((prev) => ({
                        ...prev,
                        phone: "Phone number is required",
                      }));
                    }
                  }}
                  inputStyle={{
                    width: "100% !important",
                    fontSize: "16.24px",
                    textTransform: "uppercase",
                    border: "none",
                    outline: "none",
                  }}
                  placeholder={language === "ENG" ? "Phone*" : "رقت التواصل"}
                  //forceDialCode
                  countries={defaultCountries.filter((c) =>
                    [
                      "af",
                      "al",
                      "dz",
                      "ad",
                      "ao",
                      "ag",
                      "ar",
                      "am",
                      "au",
                      "at",
                      "az",
                      "bh",
                      "bd",
                      "bb",
                      "by",
                      "be",
                      "bz",
                      "bj",
                      "bt",
                      "bo",
                      "ba",
                      "bw",
                      "br",
                      "bn",
                      "bg",
                      "bf",
                      "bi",
                      "kh",
                      "cm",
                      "ca",
                      "cv",
                      "cf",
                      "td",
                      "cl",
                      "cn",
                      "co",
                      "km",
                      "cg",
                      "cd",
                      "cr",
                      "ci",
                      "hr",
                      "cu",
                      "cw",
                      "cy",
                      "cz",
                      "dk",
                      "dj",
                      "dm",
                      "do",
                      "ec",
                      "eg",
                      "sv",
                      "gq",
                      "er",
                      "ee",
                      "et",
                      "fj",
                      "fi",
                      "fr",
                      "ga",
                      "gm",
                      "ge",
                      "de",
                      "gh",
                      "gi",
                      "gr",
                      "gd",
                      "gp",
                      "gu",
                      "gt",
                      "gn",
                      "gw",
                      "gy",
                      "ht",
                      "hn",
                      "hk",
                      "hu",
                      "is",
                      "in",
                      "id",
                      "ir",
                      "iq",
                      "ie",
                      "it",
                      "jm",
                      "jp",
                      "jo",
                      "kz",
                      "ke",
                      "ki",
                      "kr",
                      "kw",
                      "kg",
                      "la",
                      "lv",
                      "lb",
                      "ls",
                      "lr",
                      "ly",
                      "li",
                      "lt",
                      "lu",
                      "mg",
                      "mw",
                      "my",
                      "mv",
                      "ml",
                      "mt",
                      "mh",
                      "mq",
                      "mr",
                      "mu",
                      "yt",
                      "mx",
                      "fm",
                      "md",
                      "mc",
                      "mn",
                      "me",
                      "ms",
                      "ma",
                      "mz",
                      "na",
                      "nr",
                      "np",
                      "nl",
                      "nc",
                      "nz",
                      "ni",
                      "ne",
                      "ng",
                      "nu",
                      "nf",
                      "mp",
                      "no",
                      "om",
                      "pk",
                      "pw",
                      "ps",
                      "pa",
                      "pg",
                      "py",
                      "pe",
                      "ph",
                      "pn",
                      "pl",
                      "pt",
                      "pr",
                      "qa",
                      "re",
                      "ro",
                      "ru",
                      "rw",
                      "bl",
                      "sh",
                      "kn",
                      "lc",
                      "mf",
                      "pm",
                      "vc",
                      "ws",
                      "sm",
                      "st",
                      "sa",
                      "sn",
                      "rs",
                      "sc",
                      "sl",
                      "sg",
                      "sx",
                      "sk",
                      "si",
                      "sb",
                      "so",
                      "za",
                      "ss",
                      "es",
                      "lk",
                      "sd",
                      "sr",
                      "sz",
                      "se",
                      "ch",
                      "sy",
                      "tw",
                      "tj",
                      "tz",
                      "th",
                      "tl",
                      "tg",
                      "tk",
                      "to",
                      "tt",
                      "tn",
                      "tr",
                      "tm",
                      "tv",
                      "ug",
                      "ua",
                      "ae",
                      "gb",
                      "us",
                      "uy",
                      "uz",
                      "vu",
                      "ve",
                      "vn",
                      "vg",
                      "vi",
                      "wf",
                      "ws",
                      "ye",
                      "za",
                      "zm",
                      "zw",
                    ].includes(parseCountry(c).iso2)
                  )}
                />
                <div className="absolute inset-x-0 bottom-0 h-[0.8px] bg-black transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100"></div>
                {errors.phone && (
                  <span className="text-red-500 uppercase text-xs absolute left-0 bottom-[-20px]">
                    {errors.phone}
                  </span>
                )}
              </div>
              {/* Phone Number input field End...*/}
            </div>
          </div>

          {/* Descrition field Start*/}
          <div className="relative group border-b-[1px] border-gray">
            <textarea
              name="description"
              placeholder=" "
              value={formData.description}
              onChange={handleChange}
              onBlur={() => {
                if (!formData.description) {
                  setErrors((prev) => ({
                    ...prev,
                    description: "Description is required",
                  }));
                }
              }}
              className="peer h-40 w-full bg-transparent overflow-hidden pt-3 pb-1.5 font-sans text-sm font-normal text-black outline outline-0 transition-all focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
              style={{ fontSize: "16px", touchAction: "manipulation" }}
           />
            <label
              className={`pointer-events-none absolute ${
                language === "ENG" ? "left-0" : "right-0"
              } -top-0.5 flex h-full w-full select-none uppercase !overflow-visible truncate text-[10px] font-normal leading-tight text-black transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:transition-transform after:duration-300 peer-placeholder-shown:text-[12px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-black peer-focus:text-[10px] peer-focus:leading-tight peer-focus:text-gray peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-black`}
              style={{ fontSize: "12px", textTransform: "uppercase" }}
            >
              {language === "ENG" ? "Description*" : "وصف"}
            </label>
            <div className="absolute inset-x-0 bottom-0 h-[0.8px] bg-black transition-all duration-1000 origin-left transform scale-x-0 group-hover:scale-x-100"></div>
            {errors.description && (
              <span className="text-red-500 uppercase text-xs absolute left-0 bottom-[-20px]">
                {errors.description}
              </span>
            )}
          </div>

          {/* Descrition field End...*/}

          {/* Upload field Start*/}
          <div>
            <div>
              <div className="flex mt-[4px] md:mt-[20px] justify-start">
                <p className="font-[400] text-[12px] ">
                  {language === "ENG" ? "OPTIONAL" : "خياري"}
                </p>
              </div>
              <div className="border-2 border-[#8E8E8E] border-dashed  h-[100.08px]  2xl:h-[120.08px]  flex items-center justify-center">
                <label
                  htmlFor="upload"
                  className="cursor-pointer flex gap-6 lg:gap-[46px] items-center p-2 text-[#8E8E8E] text-[18.24px] 2xl:text-[26.3px]"
                >
                  <BsUpload />

                  {language === "ENG" ? " Upload Additional file" : "مرفقات"}
                </label>
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            {fileName && (
              <div className="mb-1 mt-2 text-[16px] text-gray-700 flex items-center justify-between">
                <span>{fileName}</span>
                <RxCross2
                  onClick={() => {
                    setFileName("");
                  }}
                />
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="uppercase text-red-500 text-xs">{errorMessage}</div>
          )}

          <div className="flex items-center justify-center gap-[15px] my-[40px] md:my-0">
            <div className="flex items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 md:w-5 md:h-5 text-blue-600 bg-gray-100 border-gray-300 rounded checked:bg-pink-500"
              />
              <label
                htmlFor="link-checkbox"
                className="ms-2 font-normal uppercase text-[#383C3E]"
              >
                <span className="text-[12px] sm:text-[14px] lg:text-[16px] leading-[18.23px] lg:leading-[26px]">
                  {language === "ENG"
                    ? "I want to protect my data by signing an NDA"
                    : "أرغب بتوقيع طلب عدم افشاء السرية NDA"}
                  .
                </span>
              </label>
            </div>
          </div>

          <div className="btn mb-[40px] md:mb-0 bg-pink text-white text-center p-1 2xl:p-2 rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15.53px]">
            <button
              type="submit"
              className="btn w-full lg:h-[45px] 2xl:h-[70px] text-[18px]  2xl:text-[27.34px] leading-[43.74px] tracking-[0.98px] font-bold uppercase"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : language === "ENG"
                ? "Submit it"
                : "إرسال "}
            </button>
          </div>
          {/* Submit button end.. */}
          <div className=" flex md:hidden justify-between lg:justify-start gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-normal uppercase text-[10.31px] lg:text-[14.87px] text-[#757575] tracking-[-0.24px] lg:tracking-[-0.35px] leading-[12px] lg:leading-[17.28px]">
                {language === "ENG"
                  ? "Business enquiries"
                  : "الاستفسارات التجارية"}
              </span>
              <span className="font-normal uppercase text-[12px] lg:text-[16.95px] text-[#2A2A2A] tracking-[-0.38px] leading-[19.2px]">
                Hi@GHmza.com
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-normal uppercase text-[10.31px] lg:text-[14.87px] text-[#757575] tracking-[-0.24px] lg:tracking-[-0.35px] leading-[12px] lg:leading-[17.28px]">
                {language === "ENG" ? "Open Positions" : "المناصب المفتوحة"}
              </span>
              <span className="font-normal uppercase text-[12px] lg:text-[16.95px] text-[#2A2A2A] tracking-[-0.38px] leading-[19.2px]">
                JOBS@GHMZA.COM
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
