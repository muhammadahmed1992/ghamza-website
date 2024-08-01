"use client";
import React, { useEffect, useState, useRef } from "react";
import "./CursorAnimation.css";
import { gsap } from "gsap";
import { useSelector } from "react-redux";

const CursorAnimation = () => {
  const bigBall = useRef(null);
  const smallBall = useRef(null);
  const tooltip = useRef(null);
  const [tooltipText, setTooltipText] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const selectedLanguage = useSelector(state => state.language.selectedLanguage);

  const isMobile = () =>
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    if (isMobile()) return;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (bigBall.current && smallBall.current) {
        gsap.to(bigBall.current, { duration: 0.4, x: mouseX - 15, y: mouseY - 15 });
        gsap.to(smallBall.current, { duration: 0.1, x: mouseX - 15, y: mouseY - 15 });
      }

      if (tooltip.current) {
        gsap.to(tooltip.current, { duration: 0.4, x: mouseX + 15, y: mouseY + 15 });
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === "IMG" && e.target.dataset.tooltip) {
        setTooltipText(e.target.dataset.tooltip);
        setIsTooltipVisible(true);
        setTimeout(() => {
          const tooltipEl = tooltip.current;
          tooltipEl.style.width = `${tooltipEl.scrollWidth}px`;
          tooltipEl.style.height = `${tooltipEl.scrollHeight}px`;
        }, 10);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName === "IMG") {
        setIsTooltipVisible(false);
        const tooltipEl = tooltip.current;
        tooltipEl.style.width = "0";
        tooltipEl.style.height = "0";
      }
    };

    const handleClick = () => {
      setIsTooltipVisible(false);
      const tooltipEl = tooltip.current;
      tooltipEl.style.width = "0";
      tooltipEl.style.height = "0";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
      setIsTooltipVisible(false);
    };
  }, []);

  if (isMobile()) return null;

  return (
    <>
      <div className="cursor">
        <div ref={bigBall} className="cursorBall cursorBallBig">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>
        <div ref={smallBall} className="cursorBall cursorBallSmall">
          <svg height="30" width="30">
            <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
          </svg>
        </div>
      </div>
      <div
        ref={tooltip}
        className={`tooltip ${isTooltipVisible ? "visible" : ""}`}
      >
        {isTooltipVisible && <span className={`${selectedLanguage === "ENG" ? 'font-custom1':'font-custom3'}`}>{tooltipText}</span>}
      </div>
    </>
  );
};

export default CursorAnimation;
