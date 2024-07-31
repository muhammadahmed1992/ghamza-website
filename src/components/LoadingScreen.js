"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoWhite from "../../public/images/logoWhite.png";
import { usePathname } from "next/navigation";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      const animateProgress = () => {
        let progressValue = 0;
        const interval = setInterval(() => {
          progressValue += 1;
          setProgress(progressValue);
          if (progressValue >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsSlidingOut(true);
              setTimeout(() => {
                setLoading(false);
              }, 3000);
            }, 500);
          }
        }, 25);
      };

      animateProgress();
    }
  }, [isHomePage]);

  useEffect(() => {
    if (isHomePage) {
      if (loading) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  }, [loading, isHomePage]);

  if (!isHomePage) {
    return null;
  }
  return (
    loading && (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#DF1780] flex justify-center items-center z-[9999] ${
          isSlidingOut ? "slide-out" : ""
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-[170px] h-[170px] -mb-6 relative">
            <Image src={logoWhite} alt="logo" fill objectFit="cover" />
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <span className="text-white mr-2 font-normal text-[29.84px] tracking-[-0.95px]">
              GHMZA
            </span>
            <div className="w-[310.39px] h-[2.87px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)]">
              <div
                className="h-full bg-[#4caf50]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-white ml-2 font-normal text-[29.84px] tracking-[-0.95px]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
