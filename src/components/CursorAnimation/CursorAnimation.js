"use client";
import React, { useEffect, useState, useRef } from "react";
import "./CursorAnimation.css";
import { TweenMax } from "gsap/gsap-core";
import { useSelector } from "react-redux";

const CursorAnimation = () => {
  const bigBall = useRef(null);
  const smallBall = useRef(null);
  const tooltip = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const selectedLanguage = useSelector(
    (state) => state.language.selectedLanguage
  );


  const [tooltipText, setTooltipText] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const isMobile = () =>
    typeof navigator !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    if (isMobile()) {
      return;
    }

    const handleMouseMove = (e) => {
      if (!isMobile()) {
        mouseX.current = e.clientX;
        mouseY.current = e.clientY;

        if (bigBall.current && smallBall.current) {
          TweenMax.to(bigBall.current, 0.4, {
            x: e.pageX - 15,
            y: e.pageY - 15,
          });
          TweenMax.to(smallBall.current, 0.1, {
            x: e.pageX - 15,
            y: e.pageY - 15,
          });
        }

        if (tooltip.current) {
          TweenMax.to(tooltip.current, 0.4, {
            x: e.pageX + 15,
            y: e.pageY + 15,
          });
        }
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === "IMG" && e.target.dataset.tooltip) {
        setTooltipText(e.target.dataset.tooltip);
        setIsTooltipVisible(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName !== "IMG") {
        setIsTooltipVisible(false);
      }
    };

    const handleClick = () => {
      setIsTooltipVisible(false);
    };

    const updateBallPosition = () => {
      const cursor = tooltip.current;
      cursor.style.display = "block";
      requestAnimationFrame(updateBallPosition);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleClick);
    updateBallPosition();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("click", handleClick);
      setIsTooltipVisible(false);
    };
  }, []);

  if (isMobile()) {
    return null;
  }

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
        className={` ${isTooltipVisible ? "visible tooltip" : ""}`}
      >
        {isTooltipVisible && <span className={selectedLanguage === "ENG" ? 'font-custom1':'font-custom3'}>{tooltipText}</span>}
      </div>
    </>
  );
};

export default CursorAnimation;
