import React, { useEffect, useRef } from "react";
import WinkSection from "./WinkSection";
import CardSection from "./CardSection";

const ParentComponent: React.FC = () => {
  const winkSectionRef = useRef<HTMLDivElement | null>(null);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);

  const elementIsVisibleInViewport = (el: HTMLElement): boolean => {
    const { top, bottom } = el.getBoundingClientRect();
    const { innerHeight } = window;

    return top < innerHeight && bottom > 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (winkSectionRef.current && cardSectionRef.current) {
        // const isWinkVisible = elementIsVisibleInViewport(winkSectionRef.current);
        // const isCardVisible = elementIsVisibleInViewport(cardSectionRef.current);

        // if (isWinkVisible || isCardVisible) {
        //   document.body.classList.remove("theme-black");
        //   if (!document.body.classList.contains("theme-light-gray")) {
        //     document.body.classList.add("theme-black");
        //   }
        // } else {
        //   document.body.classList.remove("theme-light-gray");
        //   if (!document.body.classList.contains("theme-black")) {
        //     document.body.classList.add("theme-black");
        //   }
        // }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div ref={winkSectionRef}>
        <WinkSection />
      </div>
      <div ref={cardSectionRef}>
        <CardSection />
      </div>
    </div>
  );
};

export default ParentComponent;
