import React, { useEffect, useRef, useState } from "react";
import {
  Miami,
  SVG,
  dog,
  image1,
  image2,
  image3,
  image4,
  manMountain,
  peoples,
  SVGWHITE,
} from "../../../../public/images/about_assets/index";
import Image from "next/image";
import { motion, useTransform, useScroll, transform, useSpring } from "framer-motion";
import ArrowSVG from "./ArrowSVG";

const HorizontalSection = () => {
  return (
    <div>
      <HorizontalScrollCarousel /> 
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const elementIsVisibleInViewport = (el: HTMLElement): boolean => {
    const { top, bottom } = el.getBoundingClientRect();
    const { innerHeight } = window;

    return top < innerHeight - top && bottom > 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const isHorizontalVisible = elementIsVisibleInViewport(targetRef.current);

        // if (isHorizontalVisible) {
        //   document.body.classList.add("theme-pink");
        // } else {
        //   document.body.classList.remove("theme-pink");
        // }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setInnerWidth(window?.innerWidth);
    let hasRun1 = false;
    let hasRun2 = false;

    const observer1 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun1) {
            hasRun1 = true;
            let start = 0;
            const end = 203;
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / end));

            const timer = () => {
              start += 1;
              setCount1(start);
              if (start < end) {
                setTimeout(timer, stepTime);
              }
            };

            timer();
          }
        });
      },
      { threshold: 0.1 }
    );

    const observer2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun2) {
            hasRun2 = true;
            let start = 5000;
            const end = 30000;
            const duration = 2000; // 2 seconds
            const stepTime = Math.abs(Math.floor(duration / ((end - start) / 1000)));

            const timer = () => {
              start += 1000;
              setCount2(start);
              if (start < end) {
                setTimeout(timer, stepTime);
              }
            };

            timer();
          }
        });
      },
      { threshold: 0.1 }
    );

    const section1 = document.querySelector(".count-section-1");
    const section2 = document.querySelector(".count-section-2");

    if (section1) {
      observer1.observe(section1);
    }

    if (section2) {
      observer2.observe(section2);
    }

    return () => {
      if (section1) {
        observer1.unobserve(section1);
      }
      if (section2) {
        observer2.unobserve(section2);
      }
    };
  }, [targetRef]);

  const x = useTransform(scrollYProgress, [0, 1], ["1%", innerWidth > 768 ? "-75%" : "-78%"]);
  const img1X = useTransform(scrollYProgress, [0.2, 1], ["0%", "125%"]);
  const img2X = useTransform(scrollYProgress, [0.2, 1], ["-75%", "-0%"]);
  const img3X = useTransform(scrollYProgress, [0.2, 1], ["-25%", "-100%"]);
  const img4X = useTransform(scrollYProgress, [0.2, 1], ["0%", "-125%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          <div className="horizontal-item !w-[100vw] !h-screen relative">
            <div className="horizontal-item-text">
              <div className="hori-f3 ">
                <span className="inline-block">REAL IMPACT,</span>
                <span className="inline-block">REAL REACH</span>
              </div>
            </div>
            <div className="horizontal-btn">
              <div className="button rounded-md">
                <div className="button-text">CONTACT!!</div>
                <Image className="button-arrow !w-[5.62px] md:!w-[21.11px]" src={SVGWHITE} alt="" />
              </div>
            </div>
            <div className="absolute bottom-[20px] right-3 lg:right-[120px]">
              <ArrowSVG arrowHeight={innerWidth > 1024? 100 : 50} lineWidth={innerWidth > 1024 ? 4 : 2} />
            </div>
          </div>
          <div className="horizontal-item count-section-1 !w-[100vw] !h-screen relative">
            <div className="horizontal-content">
              <div className="hori-f1">{count1} M</div>
              <div className="hori-f2">
                Real people — real lives — TOTAL REACH
                <br />
                OUR SO MANY PLATFORMS
              </div>
            </div>
            <div className="horiztonal-desc">
              <div className="hori-para">
                We’re on a mission to impact as many
                <br />
                lives as possible and build a better
                <br />
                world while we do it.
                <br />
                Here’s our progress.
              </div>
            </div>
            <div className="horizontal-imgs">
              <motion.div style={{x:img4X}} className="horizontal-img-cont1 absolute md:top-[150px] md:-right-[30px] block">
                <Image className="w-[153.61px] h-[92.38px] md:h-[150px] md:w-[250px] 2xl:h-[238px] 2xl:w-[424px]" src={dog} alt="" />
              </motion.div>
              <motion.div style={{x:img1X}} className="horizontal-img-cont2 absolute block md:bottom-[60px] md:left-[50px]">
                  <Image
                    className="w-[112.8px] h-[63.36px] md:h-[150px] md:w-[250px] 2xl:h-[238px] 2xl:w-[424px] "
                    src={manMountain}
                    alt=""
                  />
              </motion.div>
                <motion.div style={{x:img3X}} className="horizontal-img-cont3 block">
                  <Image className="h-[74.54px] w-[133.11px] md:h-[150px] md:w-[250px] 2xl:h-[250px] 2xl:w-[450px]" src={Miami} alt="" />
                </motion.div>
              
                <motion.div style={{x:img2X}} className="horizontal-img-cont4 block absolute md:-translate-x-2/4 md:-top-2 md:left-2/4 ">
                  <Image className="h-[74.54px] w-[133.11px] md:h-[150px] md:w-[250px] 2xl:h-[250px] 2xl:w-[450px]" src={peoples} alt="" />
                </motion.div> 
            </div>
          </div>
          <div className="horizontal-item count-section-2 !w-[100vw] !h-screen relative">
            <div className="horizontal-content">
              <div className="hori-f2">WE CREATED OVER</div>
              <div className="hori-f1">{count2}+</div>
              <div className="hori-f2">HOURS OF FOOTAGE COMBINED</div>
            </div>
            <div className="absolute left-[-10px] lg:left-[300px] top-[245px] lg:top-[125px] ">
              <div className="hori-para">
                OUR ALL OUR GENRES WE CREATED OVER 12 <br />
                SHOWS, 2 movies , 100+ LIVE <br />
                EXPERIENCES , and over 25 ARTISTS IN <br />
                THE MENA REGION
              </div>
            </div>
            <div className="horizontal-imgs">
              <div className="horizontal-img-cont5 block">
                <Image className="w-[44.05px] h-[44.05px] md:h-[165.47px] md:w-[165.47px]" src={image1} alt="" />
              </div>
              <div className="horizontal-img-cont6 block">
                <Image className="w-[55.38px] h-[31.64px] md:h-[118px] md:w-[208px]" src={image4} alt="" />
              </div>
              <div className="horizontal-img-cont7 block">
                <Image className="w-[50.48px] h-[39.73px] md:w-[145.94px] md:h-[149.15px]" src={image2} alt="" />
              </div>
              <div className="horizontal-img-cont8 block">
                <Image className="w-[33.76px] h-[26.06px] md:h-[97px] md:w-[125px]" src={image3} alt="" />
              </div>
            </div>
          </div>
          <div className="horizontal-item !w-[100vw] !h-screen ">
            <div className="absolute bottom-[75px] lg:bottom-[20px] lg:right-[60px] right-[-70px]">
              <ArrowSVG direction="vertical" arrowHeight={((innerWidth > 1024) ? 100 : 50)} lineWidth={((innerWidth > 1024) ? 4 : 2)}/>
            </div>
            <div className="horizontal-content">
              <div className="hori-f3">LETS CREATE</div>
              <div className="hori-f2">AND ENABLE YOU FOR YOUR CRAZIEST IDEA YET</div>
            </div>
            <div className="horizontal-btn2 md:block hidden">
              <div className="horizontal-btn">
                <div className="button rounded-md !w-[270px] !h-[44px]">
                  <div className="button-text">CREATE WITH US</div>
                  <Image className="button-arrow" src={SVGWHITE} alt="" />
                </div>
              </div>
            </div>
            <div>
              <div className="horizontal-btn2 block md:hidden text-[10.13px] leading-[6.82px]">CREATE WITH US</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalSection;
