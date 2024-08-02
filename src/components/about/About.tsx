"use client";
import twitterLogo from "../../../public/images/about_assets/twitterLogo.png";
import { motion, useScroll } from "framer-motion";
import TeamInformation from "./Components/TeamInformation";
import Card from "./Components/SocialPostsCardView";
import rectangle from "../../../public/images/about_assets/bgImage.png";
import camera from "../../../public/images/about_assets/camera-black.svg";
import goVegan from "../../../public/images/about_assets/goVegan.png";
import { useEffect, useState, useRef } from "react";
import CustomSlider from "./Components/CardSlider";
import HorizontalSection from "./Components/HorizontalSection";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import AnimatedButton from "./Components/AnimatedButton";
import AnimateWhenInViewport from "./Components/AnimateWhenInViewport";
import WinkCardSectionParent from "./Components/WinkCardSectionParent";
import "./style.css";
import { useSelector } from "react-redux";

const cardItems = [
  {
    id: 1,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them! ",
  },
  {
    id: 2,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them! ",
  },
  {
    id: 3,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them! ",
  },
  {
    id: 4,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them!",
  },
  {
    id: 5,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them!",
  },
  {
    id: 6,
    title: "GoVegan",
    hashtags: ["#vegan", "#healthy"],
    socialAppIcon: twitterLogo.src,
    rectangle: rectangle.src,
    goVegan: goVegan.src,
    camera: camera.src,
    date: "15 Oct 2019",
    description:
      "Feeling hungry? When our week gets busy, it can be challenging to get creative with your tasty plant-based meal options — we get it! Tag a friend to share this week’s snack plan with them! ",
  },

  // Add more cards as per your requirement
];

interface SearchState {
  isSearchOpen: boolean;
}

interface LanguageState {
  selectedLanguage: string;
}

interface RootState {
  search: SearchState;
  language: LanguageState;
}

export default function About() {
  const isSearchOpen = useSelector((state: RootState) => state.search.isSearchOpen);
  const selectedLanguage = useSelector(
    (state: RootState) => state.language.selectedLanguage
  );
  const ScrollToSection = () => {
    const { scrollYProgress } = useScroll();
  }
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const winkCardSectionParentRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const { scrollYProgress } = useScroll();
  const heroScroll = useScroll({
    target: heroSectionRef,
    offset: ["start end", "end start"]
  });

  const winkCardScroll = useScroll({
    target: winkCardSectionParentRef,
    offset: ["start end", "end start"]
  });
  
  const horizontalScroll = useScroll({
    target: horizontalSectionRef,
    offset: ["start end", "end start"]
  });
  scrollYProgress.on("change", (latest) => {
    console.log({latest});
   const latestHero = heroScroll.scrollYProgress.get();
      const latestWinkCard = winkCardScroll.scrollYProgress.get();
      const latestHorizontal = horizontalScroll.scrollYProgress.get();
      const aboutPage = document.getElementById('about-page');

      if(!aboutPage) return;

      if (latestHero < 0.87) {
        aboutPage.classList.remove("theme-pink", "theme-light-gray");
        aboutPage.classList.add("theme-black");
      } else if (latestWinkCard < 0.95) {
        aboutPage.classList.remove("theme-pink", "theme-black");
        aboutPage.classList.add("theme-light-gray");
      } else if (latestHorizontal < 0.825) {
        aboutPage.classList.remove("theme-light-gray", "theme-black");
        aboutPage.classList.add("theme-pink");
      } else {
        aboutPage.classList.remove("theme-pink", "theme-black");
        aboutPage.classList.add("theme-light-gray");
      }
    // if (latest < 0.25) {
    //   aboutPage.classList.remove("theme-pink");
    //   aboutPage.classList.remove("theme-light-gray");
    //   if (!aboutPage.classList.contains("theme-black")) {
    //     aboutPage.classList.add("theme-black");
    //   }
    // } else if (latest < 0.57) {
    //   aboutPage.classList.remove("theme-pink");
    //   aboutPage.classList.remove("theme-black");
    //   if (!aboutPage.classList.contains("theme-light-gray")) {
    //     aboutPage.classList.add("theme-light-gray");
    //   }
    // } else if (latest < (((innerWidth!) < 1280)? 0.85 : 0.78)) {
    //   aboutPage.classList.remove("theme-light-gray");
    //   aboutPage.classList.remove("theme-black");
    //   if (!aboutPage.classList.contains("theme-pink")) {
    //     aboutPage.classList.add("theme-pink");
    //   }
    // } else {
    //   aboutPage.classList.remove("theme-pink");
    //   aboutPage.classList.remove("theme-black");
    //   if (!aboutPage.classList.contains("theme-light-gray")) {
    //     aboutPage.classList.add("theme-light-gray");
    //   }
    // }
  });
  useEffect(() => {
    const scrollToPercentage = 0.12; // 12% of the page height
    const targetScrollY = document.body.scrollHeight * scrollToPercentage;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    setInnerWidth(window?.innerWidth);
  }, []);

  return (
    <div id="about-page" className="no-select">
      <div ref={heroSectionRef}>
        <HeroSection />
      </div>
      <div ref={winkCardSectionParentRef}>
        <WinkCardSectionParent />
      </div>
      <div ref={horizontalSectionRef}>
        <HorizontalSection />
      </div>
      <div>
        <section className="pt-2">
          <div className="flex justify-center py-5">
            <AnimateWhenInViewport
              textToBeAnimated="ALL THAT WE DID!!!"
              cssClass="font-bold text-[30px]  sm:text-[40px] lg:text-[80px] xl:text-[128px] leading-[28px] lg:leading-[108.85px] leading-[148.13px] text-black tracking-[0px] lg:!-tracking-[10px]"
            />
          </div>

          <div className="flex justify-center">
            <AnimateWhenInViewport
              textToBeAnimated="THAT YOU MUST HAVE SEEN"
              cssClass="text-center -mt-7  lg:-mt-4  mb-10 lg:text-[27.3px] text-[14px] text-black !-tracking-[0px]"
              styles={{ fontWeight: "700", lineHeight: "32.52px", fontFamily: "SFProDisplay, sans-serif" }}
            />
          </div>

          <TeamInformation />

          <div className="mt-20 flex justify-center pb-3">
            <div className="sm:w-auto lg:w-[20%] w-[20%]  md:block hidden">
              <AnimatedButton
                text="SEE MORE"
                customCssStyles={{
                  marginTop: "20px",
                  textAlign: "center",
                  backgroundColor: "#DF1780",
                  border: "none",
                  color: "white",
                  padding: "20px 40px",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15.5px",
                  lineHeight: "25.6px",
                  fontWeight: "590",
                  fontFamily: "SFProDisplay, sans-serif",
                  width: "80%",
                  justifyContent: "space-between",
                }}
                arrowStyle={{
                  stroke: "#FFFFFF",
                  marginLeft: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </div>
            <div className=" w-[100%] md:hidden flex justify-center">
              <AnimatedButton
                text="SEE MORE"
                customCssStyles={{
                  marginTop: "20px",
                  textAlign: "center",
                  backgroundColor: "#DF1780",
                  border: "none",
                  color: "white",
                  padding: "20px 40px",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15.5px",
                  lineHeight: "25.6px",
                  fontWeight: "590",
                  fontFamily: "SFProDisplay, sans-serif",
                  width: "100%",
                  justifyContent: "space-between",
                  margin: "0px 24px",
                }}
                arrowStyle={{
                  stroke: "#FFFFFF",
                  marginLeft: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </div>
          </div>
        </section>

        <section className="flex pb-10 bg-[#D9D9D9] flex-col xl:flex-row">
          <div className="w-full  xl:w-5/12 flex md:flex-col  items-center md:items-start pl-8 md:pl-16">
            <div className="w-5/12 lg:w-full mt-14  xl:mt-72">
              <AnimateWhenInViewport
                textToBeAnimated="Stay up-to-date on the"
                cssClass=":w-4/12 w-5/12 md:ml-[2.7rem] lg:ml-3 md:text-[18.28px] text-[9.5px] "
                styles={{
                  fontWeight: "590",
                  color: "#000000",
                  fontFamily: "SFProDisplay, sans-serif",
                }}
              />
              <AnimateWhenInViewport
                textToBeAnimated="latest Ghmza and share"
                cssClass="md:w-4/12 w-5/12 md:ml-[2.7rem] lg:ml-3 md:text-[18.28px] text-[9.5px] "
                styles={{
                  fontWeight: "590",
                  color: "#000000",
                  fontFamily: "SFProDisplay, sans-serif",
                }}
              />
              <AnimateWhenInViewport
                textToBeAnimated="your thoughts."
                cssClass="md:w-4/12 w-5/12 md:ml-[2.7rem] lg:ml-3 md:text-[18.28px] text-[9.5px] "
                styles={{
                  fontWeight: "590",
                  color: "#000000",
                  fontFamily: "SFProDisplay, sans-serif",
                }}
              />
            </div>
            <div className="w-[53%] flex flex-col items-end md:items-start lg:w-7/12 mt-[3.5rem] xl:mt-[630px] ">
              <AnimateWhenInViewport
                textToBeAnimated="EXPLORE"
                cssClass=" md:text-[58px] text-[24.83px]  flex justify-start  !font-sf-pro-bold !font-[900]"
                styles={{ color: "#000000" }}
              />

              <AnimateWhenInViewport
                textToBeAnimated="THE REST"
                cssClass="md:text-[58px] -mt-3 md:-mt-10 text-[24.83px]  md:flex md:!font-[400] !font-sf-pro-medium "
              />
            </div>
            <div className="hidden md:block ">
              <AnimatedButton
                text="TAKE ME BACK"
                customCssStyles={{
                  backgroundColor: "#DF1780",
                  border: "none",
                  color: "white",
                  padding: "10px 20px",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "15.5px",
                  lineHeight: "25.6px",
                  fontWeight: "590",
                  fontFamily: "SFProDisplay, sans-serif",
                  justifyContent: "space-between",
                  width: "248.44px",
                  height: "63.09px",
                }}
                arrowStyle={{
                  stroke: "#FFFFFF",
                  marginLeft: "30px",
                  display: "flex",
                  alignItems: "center",
                }}
              />
            </div>
          </div>

          <div className="w-full lg:w-full xl:w-7/12 hidden md:block">
            <motion.div
              layout
              className="grid grid-col grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 relative mt-10 lg:mt-48 gap-x-[-30px !important] !gap-x-[-4px] !gap-y-[-4px] mr-8"
            >
              {cardItems.map((card, index) => (
                <Card
                  key={card.id}
                  data={card}
                  hover={Math.floor(index % (innerWidth > 1700 ? 3 : 2)) === hoveredColumn}
                  onMouseEnter={() => setHoveredColumn(Math.floor(index % (innerWidth > 1700 ? 3 : 2)))}
                  onMouseLeave={() => setHoveredColumn(null)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mobile responsive card */}
        <div className="bg-[#D9D9D9] w-full block md:hidden pb-10">
          <CustomSlider cards={cardItems} />
        </div>
        <div className="flex justify-center md:hidden pb-10 bg-[#D9D9D9]">
          <AnimatedButton
            text="TAKE ME BACK!"
            customCssStyles={{
              marginTop: "20px",
              backgroundColor: "#DF1780",
              border: "none",
              color: "white",
              padding: "20px 40px",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              fontSize: "15.5px",
              lineHeight: "25.6px",
              fontWeight: "590",
              fontFamily: "SFProDisplay, sans-serif",
              width: "248.44px",
              justifyContent: "space-between",
              height: "63.09px",
            }}
            arrowStyle={{ stroke: "#FFFFFF", marginLeft: "30px", display: "flex", alignItems: "center" }}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
