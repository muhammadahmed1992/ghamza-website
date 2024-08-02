import React, { forwardRef, useRef, useEffect } from "react";
import AnimateWhenInViewport from "./AnimateWhenInViewport";
import { Group, image1, image2, image3, image4 } from "../../../../public/images/about_assets";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";
import {useScroll, useTransform} from 'framer-motion'
import CardHorizontal from "./CardHorizontal";

const elementIsVisibleInViewport = (el: HTMLElement): boolean => {
  const { top } = el.getBoundingClientRect();
  

  const { innerHeight } = window;

  return top < innerHeight - top / 1.5;
};

const CardSection = forwardRef<HTMLDivElement>((props, ref) => {
  const cardsListRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const {scrollYProgress: viewportScrollY} = useScroll();
  const cards = cardsListRef.current?.querySelectorAll(".cards-item");
  const { scrollYProgress: cardSectionScrollY } = useScroll({
    target: cardSectionRef,
  });
  // cardSectionScrollY.on("change", (latest) => {
  //   console.log(latest);
  // })
  const transformX = useTransform(cardSectionScrollY, [0, 1], ["0%", "-100%"]);
  viewportScrollY.on("change", () => {
    cards?.forEach((card) => {
        if(elementIsVisibleInViewport(card as HTMLElement)){
          card.classList.add('card-color-change');
        }
        else {
          card.classList.remove('card-color-change');
        }
      });
  }) 
  useEffect(() => {
    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach(entry => {
    //       const { bottom } = entry.boundingClientRect;
    //       const windowHeight = window.innerHeight;
    //       const threshold = windowHeight * 0.5; // 25% from bottom
    //       console.log({bottom, threshold});
    //       if (bottom > threshold) {
    //         entry.target.classList.add('card-color-change');
    //       } else {
    //         entry.target.classList.remove('card-color-change');
    //       }
    //   });
    // }, {
    //   threshold: [0, 1.0] // Observing fully visible elements
    // });

    // console.log({ observer: observer });

    
    

    return () => {
      // cards?.forEach((card) => {
      //   observer.unobserve(card);
      // });
    };
  }, []);
  return (
    <section ref={ref} data-module-name="card-section">
      <div ref={cardSectionRef} className="max-w-[1720px] lg:mx-auto !flex flex-col lg:!flex-row w-auto h-[2250px] w-100vw lg:w-auto">
        <div className="card-section-container sticky lg:top-0 !ml-0 lg:!ml-[60px] w-full lg:w-auto overflow-hidden">
          <div className="section-descr mx-5">
            <p className="text-[19px] font-[590] leading-[32px] tracking-[-0.4px] max-w-[592.89px]">
              GHMZA FOR YOU
            </p>
            <p className="text-[19px] font-[590] leading-[32px] tracking-[-0.4px] max-w-[750px]">
              that technology can transform healthcare to put people first. We put humanity back at the center
              of healthcare with technology that simplifies complexity, accelerates capacity, and improves
              outcomes.
            </p>
          </div>
          <div className="section-title mx-5">
            <AnimateWhenInViewport
              textToBeAnimated="WE DO A LOT!"
              cssClass="text-[35px] 2xl:text-[58px] font-[510] leading-[35px] 2xl:leading-[69.6px]"
            />
            <div className="flex">
              <AnimateWhenInViewport
                textToBeAnimated="OF"
                cssClass="text-[35px] 2xl:text-[58px] font-[510] leading-[35px] 2xl:leading-[69.6px]"
              />
              <AnimateWhenInViewport
                textToBeAnimated=" COOOOOOL"
                cssClass="text-[35px] 2xl:text-[58px] font-[860] leading-[30px] 2xl:leading-[69.6px]"
              />
            </div>
          </div>
          <div className="mx-5">
            <AnimatedButton
              text="CONTACT!!"
              customCssStyles={{
                marginTop: "20px",
                textAlign: "center",
                backgroundColor: "transparent",
                border: "1px solid #000000",
                color: "#000000",
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
                width: "222px",
                height: "57px",
                padding: "0px 20px",
              }}
              arrowStyle={{ stroke: "#000000", marginLeft: "30px", display: "flex", alignItems: "center" }}
            />
          </div>
          
          <div
            className="max-w-[536px] max-h-[433px] lg:mt-[15%] pb-[20px] 2xl:mt-[18%] hidden lg:block"
          >
            <Image className="lg:w-[350px] lg:h-[275px] 2xl:w-[475px] 2xl:h-[350px]" src={Group} alt="" />
          </div>
          <div className="block lg:hidden">
            <CardHorizontal x={transformX}/>
          </div>
        </div>
        <div className="hidden lg:flex w-full justify-end xl:mr-10 2xl:mr-0">
          <div
            className="cards-list mt-[48rem] lg:!flex !flex-row lg:!flex-col !items-center gap-10 lg:gap-5 mr-[90px] !hidden "
            ref={cardsListRef}
          >
            <div className="cards-item ">
              <div className="card-item-desc-container">
                <div className="card-item-title">FILMS</div>
                <div className="description">
                  <div className="card-item-desc">We believe technology can dramatically</div>
                  <div className="card-item-desc">improve the experience of managing</div>
                  <div className="card-item-desc">health, and — when crafted with empathy</div>
                  <div className="card-item-desc">intention, and expertise — impact lives at</div>
                  <div className="card-item-desc">scale.</div>
                </div>
              </div>
              <div className="card-image">
                <Image className="h-[71px] w-[71px]" src={image1} alt="" />
              </div>
            </div>
            <div className="cards-item">
              <div className="card-item-desc-container">
                <div className="card-item-title">MUSIC</div>
                <div className="description">
                  <div className="card-item-desc">We believe technology can dramatically</div>
                  <div className="card-item-desc">improve the experience of managing</div>
                  <div className="card-item-desc">health, and — when crafted with empathy</div>
                  <div className="card-item-desc">intention, and expertise — impact lives at</div>
                  <div className="card-item-desc">scale.</div>
                </div>
              </div>
              <div className="card-image">
                <Image className="w-[62.45px] h-[58.55px]" src={image2} alt="" />
              </div>
            </div>
            <div className="cards-item">
              <div className="card-item-desc-container">
                <div className="card-item-title">SHOWS</div>
                <div className="description">
                  <div className="card-item-desc">We believe technology can dramatically</div>
                  <div className="card-item-desc">improve the experience of managing</div>
                  <div className="card-item-desc">health, and — when crafted with empathy</div>
                  <div className="card-item-desc">intention, and expertise — impact lives at</div>
                  <div className="card-item-desc">scale.</div>
                </div>
              </div>
              <div className="card-image">
                <Image className="h-[42px] w-[54px]" src={image3} alt="" />
              </div>
            </div>
            <div className="cards-item">
              <div className="card-item-desc-container">
                <div className="card-item-title">DOCUS</div>
                <div className="description">
                  <div className="card-item-desc">We believe technology can dramatically</div>
                  <div className="card-item-desc">improve the experience of managing</div>
                  <div className="card-item-desc">health, and — when crafted with empathy</div>
                  <div className="card-item-desc">intention, and expertise — impact lives at</div>
                  <div className="card-item-desc">scale.</div>
                </div>
              </div>
              <div className="card-image">
                <Image className="h-[51px] w-[89px]" src={image4} alt="" />
              </div>
            </div>
            <div className="cards-item pr-3">
              <div className="card-item-desc-container">
                <div className="card-item-title">LIVE EXPERIENCES</div>
                <div className="description">
                  <div className="card-item-desc">We believe technology can dramatically</div>
                  <div className="card-item-desc">improve the experience of managing</div>
                  <div className="card-item-desc">health, and — when crafted with empathy</div>
                  <div className="card-item-desc">intention, and expertise — impact lives at</div>
                  <div className="card-item-desc">scale.</div>
                </div>
              </div>
              <div className="card-image ">
                {/* <Image className="h-[40px] w-[40px]" src={image4} alt="" /> */}
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
});

CardSection.displayName = "CardSection";

export default CardSection;
