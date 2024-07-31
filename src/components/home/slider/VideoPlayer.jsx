"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "../hero/Hero.css";
import "../kid/Kid.css";
import "./Slider.css";
import { useSelector } from "react-redux";
import Image from "next/image";

const HeroSlider = ({ mediaData }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [showGif, setShowGif] = useState(false);

  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === mediaData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevMedia = () => {
    setCurrentMediaIndex(
      (prevIndex) => (prevIndex - 1 + mediaData.length) % mediaData.length
    );
  };

  const preloadNextMedia = (index) => {
    const nextIndex = (index + 1) % mediaData.length;
    const nextMedia = mediaData[nextIndex];
    if (nextMedia?.type === "video") {
      const videoElement = videoRefs.current[nextIndex];
      if (videoElement && videoElement.readyState === 0) {
        videoElement.load();
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 80,
        transition: { duration: 0.2 },
      });
    }
  }, [isVisible, controls]);

  useEffect(() => {
    preloadNextMedia(currentMediaIndex);
  }, [currentMediaIndex, mediaData]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextMedia();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentMediaIndex, mediaData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGif((prevShowGif) => !prevShowGif);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeUpdate = (index) => {
    const videoElement = videoRefs.current[index];

    if (videoElement && videoElement.duration - videoElement.currentTime <= 1) {
      videoElement.pause();
      setTimeout(() => {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.9 },
        });
      }, 1000);
      preloadNextMedia(index);

      controls.start({ opacity: 0, y: 50, transition: { duration: 0 } });
      setTimeout(() => {
        if (currentMediaIndex === mediaData.length - 1) {
          setCurrentMediaIndex(0);
        } else {
          setCurrentMediaIndex(currentMediaIndex + 1);
        }
        videoElement.currentTime = 0;
      }, 1000);
    }
  };

  const isIOS = () =>
    typeof navigator !== "undefined" &&
  /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent);


  return (
    <>
      <div className={`${isLoading ? "progress-line" : ""}`}></div>
      <div
        className={`hero w-full h-[100vh] flex flex-col items-center md:items-start px-7 justify-end relative transition-[background]`}
        ref={sectionRef}
      >
        <>
          {isIOS() ? (
            <Image
              src={
                mediaData[currentMediaIndex]?.thumbnail
              }
              alt=""
              className={`image absolute bg-black inset-0 w-full h-full object-cover ${
                isLoading ? "hero_image" : ""
              }`}
              layout="fill"
            />
          ) : (
            <video
              ref={(el) => (videoRefs.current[currentMediaIndex] = el)}
              muted
              autoPlay
              onTimeUpdate={() => handleTimeUpdate(currentMediaIndex)}
              src={mediaData[currentMediaIndex]?.url}
              className={`video absolute bg-black inset-0 w-full h-full object-cover ${
                isLoading ? "hero_video" : ""
              }`}
            />
          )}
          <video
            muted
            autoPlay
            ref={(el) =>
              (videoRefs.current[(currentMediaIndex + 1) % mediaData.length] =
                el)
            }
            src={mediaData[(currentMediaIndex + 1) % mediaData.length]?.url}
            style={{ display: "none" }}
            onLoadedData={() => {}}
          />
        </>

        {mediaData?.length > 1 && (
          <>
            <button
              onClick={handlePrevMedia}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                width: "50%",
                height: "100%",
                transform: "translateY(-50%)",
                mixBlendMode: "difference",
                color:"white",
                filter:'invert(1)'
              }}
              className={`${
                selectedLanguage === "ENG" ? "justify-start" : "justify-end"
              } flex items-center`}
            >
              <Image
                src="/images/slider-arrow.png"
                className="w-[15px] h-[25px] rotate-180"
                alt=""
                width={19}
                height={19}
              />
            </button>
            <button
              onClick={handleNextMedia}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                width: "49%",
                height: "100%",
                transform: "translateY(-50%)",
                mixBlendMode: "difference",
                color:"white",
                filter:'invert(1)'
              }}
              className={`flex ${
                selectedLanguage === "ENG" ? "justify-end" : "justify-start"
              } items-center`}
            >
              <Image
                src="/images/slider-arrow.png"
                className="w-[15px] h-[25px]"
                alt=""
                width={19}
                height={19}
              />
            </button>
          </>
        )}

        {mediaData?.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
            }}
          >
            {mediaData?.map((_, index) => (
              <div
                dir={selectedLanguage === "ENG" ? "ltr" : "rtl"}
                key={index}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  margin: "0 5px",
                  marginTop: index === currentMediaIndex ? "" : "5px",
                  backgroundColor:
                    index === currentMediaIndex ? "black" : "white",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentMediaIndex(index)}
              />
            ))}
          </div>
        )}
        {showGif && (
          <>
            <img
              src="/images/aeroplane.gif"
              alt="Aeroplane"
              className="absolute inset-0 m-auto object-cover desktop-gif"
            />
            <img
              src="/images/aeroplane-m.gif"
              alt="Mobile Aeroplane"
              className="absolute inset-0 m-auto object-cover mobile-gif"
            />
          </>
        )}
      </div>
    </>
  );
};

export default HeroSlider;
