import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import GhamzaLogo from "./GhmzaLogo";
import ArrowSVG from "./ArrowSVG";

const HeroTest: React.FC = () => {
  const scrollHeroSectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionContainerRef = useRef<HTMLDivElement>(null);
  const [startAnimate, setStartAnimate] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const linesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Increase the scroll progress by 50%
  const modifiedScrollYProgress = useTransform(scrollYProgress, (value) => value * 1.5);

  const scale = useTransform(modifiedScrollYProgress, [0, 0.07, 0.098, 0.14], [35, 10, 3, 1]);
  const scaleValue = useSpring(scale, { stiffness: 300, damping: 30 });

  const clipPath = useTransform(modifiedScrollYProgress, [0, 0.1], ["circle(100%)", "circle(0%)"]);

  const translateX1 = useTransform(modifiedScrollYProgress, [0.1, 0.15, 0.25], [-8, 80, 150]);
  const translateX2 = useTransform(modifiedScrollYProgress, [0.1, 0.15, 0.25], [-8, -80, -150]);
  const translateX3 = useTransform(modifiedScrollYProgress, [0.1, 0.15, 0.25], [-8, 80, 150]);
  const translateX4 = useTransform(modifiedScrollYProgress, [0.1, 0.15, 0.25], [-8, -80, -150]);

  const videoOpacity = useTransform(modifiedScrollYProgress, [0.094, 0.095], [1, 0]);
  const circleOpacity = useTransform(modifiedScrollYProgress, [0.094, 0.096], [0, 1]);

  const x1 = useSpring(translateX1, { stiffness: 300, damping: 30 });
  const x2 = useSpring(translateX2, { stiffness: 300, damping: 30 });
  const x3 = useSpring(translateX3, { stiffness: 300, damping: 30 });
  const x4 = useSpring(translateX4, { stiffness: 300, damping: 30 });

  scaleValue.on("change", (latest) => {
    console.log({ latest });
    if (latest === 1) {
      setStartAnimate(true);
    } else {
      setStartAnimate(false);
    }
    if (latest < 10) {
      if (heroSectionContainerRef?.current?.classList.contains("hide")) {
        heroSectionContainerRef?.current?.classList.remove("hide");
        //heroSectionContainerRef?.current?.classList.remove("z-30");
      }
    } else {
      if (!heroSectionContainerRef?.current?.classList.contains("hide")) {
        heroSectionContainerRef?.current?.classList.add("hide");
        //heroSectionContainerRef?.current?.classList.remove("z-30");
      }
    }
  });

  modifiedScrollYProgress.on("change", (latest) => {
    // scrollHeroSectionRef?.current?.classList.add("bg-black");
    if (latest >= 0.09) {
      const spans = Array.from(linesRef?.current?.querySelectorAll("span") || []);
      const scrollPercent = Math.min((latest - 0.09) / (0.15 - 0.09), 2);
      let oneOpacityCount = 0;
      spans.forEach((span, index) => {
        let opacity = scrollPercent - index * 0.02;
        opacity = Math.max(opacity, 0);
        if (opacity >= 1) {
          oneOpacityCount++;
        }
        span.style.opacity = `${opacity}`;
      });
    }
  });

  console.log({ showIcon });

  return (
    <header className="hero-container" ref={scrollHeroSectionRef}>
      <div className="sticky hero">
        <motion.div
          className={`video-container ${showIcon ? "visible" : "visible"} `}
          ref={videoContainerRef}
          style={{
            clipPath: clipPath,
            opacity: videoOpacity
          }}
        >
          <video className="w-[100%] h-[115vh] object-cover z-100" autoPlay muted loop playsInline>
            <source src="https://cdn.significo.com/videos/significo-main-hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <div className="centered-div hide" ref={heroSectionContainerRef}>
          <div className="hero-subtitle">
            <div className="f-24">
              <div className="subtitle-text">
                <div className="subtitle-text-lines" ref={linesRef}>
                  <div>
                    <span>L</span>
                    <span>e</span>
                    <span>t</span>
                    <span>'</span>
                    <span>s</span>
                    <span> </span>
                    <span>t</span>
                    <span>a</span>
                    <span>l</span>
                    <span>k</span>
                    <span> </span>
                    <span>a</span>
                    <span>b</span>
                    <span>o</span>
                    <span>u</span>
                    <span>t</span>
                    <span> </span>
                    <span>y</span>
                    <span>o</span>
                    <span>u</span>
                    <span>r</span>
                  </div>
                  <div>
                    <span>N</span>
                    <span>e</span>
                    <span>x</span>
                    <span>t</span>
                    <span> </span>
                    <span>b</span>
                    <span>i</span>
                    <span>g</span>
                    <span> </span>
                    <span>i</span>
                    <span>d</span>
                    <span>e</span>
                    <span>a</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.div style={{ scale }} className="hero-row-parent pt-[30px] lg:pt-[72px]">
            <div className="hero-rows">
              <motion.div style={{ x: x1 }} className="hero-row">
                <div className="hero-row-text">CRAZY</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">USEFUL</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">INTUTIVE</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">USEFUL</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
              </motion.div>
              <motion.div style={{ x: x2 }} className="hero-row">
                <div className="hero-row-text">LOWKEY</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">AMAZING</div>
                <div className="circle-container">
                <motion.div style={{opacity: circleOpacity}} className={`circle`}></motion.div>
                </div>
                <div className="hero-row-text">WINK</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">CREATIVE</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
              </motion.div>
              <motion.div style={{ x: x3 }} className="hero-row">
                <div className="hero-row-text">CRAZY</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">USEFUL</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">INTUTIVE</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">USEFUL</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
              </motion.div>
              <motion.div style={{ x: x4 }} className="hero-row">
                <div className="hero-row-text">LOWKEY</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">AMAZING</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">WINK</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
                <div className="hero-row-text">CREATIVE</div>
                <div className="circle-container">
                  <div className="circle"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="hero-bottom !w-full mt-3 ">
            <button
              onClick={() => {
                document
                  .getElementById("winkSection")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-[18px] lg:text-[42px] flex flex-col-reverse justify-center lg:flex-row items-center mx-auto lg:mx-0 lg:pl-12  2xl:pl-20 uppercase pt-10 lg:pt-0"
            >
              <div className="hidden lg:block">
                <ArrowSVG direction={"vertical"} width="80px" />
              </div>
              <div className="lg:hidden block mt-3">
                <ArrowSVG direction={"vertical"} width="110px" />
              </div>{" "}
              <p> Scroll</p>
            </button>
            <div>
              <div className=" hidden lg:block">
                <div className="mr-10 ">
                  <GhamzaLogo height="120" width="120" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroTest;
