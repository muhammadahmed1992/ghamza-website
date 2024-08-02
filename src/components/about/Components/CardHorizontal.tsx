import { motion, useTransform, useScroll, MotionValue } from "framer-motion";
import Image from "next/image";
import { image1, image2, image3, image4 } from "../../../../public/images/about_assets";
import { useRef } from "react";

interface CardHorizontalProps {
  x : MotionValue;
}

const CardHorizontal = ( {x}: CardHorizontalProps) => {
  return (
    <div className="">
      <HorizontalScrollCarousel x={x} />
    </div>
  );
};


const HorizontalScrollCarousel = ( {x}: CardHorizontalProps) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);

  return (
    <section ref={targetRef} className="z-50 relative">
      <div className="flex items-start pt-5 overflow-hidden">
        <motion.div style={{ x }} className="px-5 flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: any) => {
  return (
    <div className="w-[250px] bg-[#DF1780] px-3 py-6 rounded-lg border border-black">
      <div className="ml-3">
        <div className="mt-5">
          <Image className="h-[48px] w-auto" src={card.url} alt="" />
        </div>
        <h4 className="text-[16.31px] font-[1000] leading-[15.77px] tracking-[-0.29px] text-white mt-8 SF-Pro">
          {card.title}
        </h4>
        <p className="text-[12.83px] font-[590] leading-[15.47px] -tracking-[0.16px] text-white mt-3 SF-Pro w-[95%]">
          {card.paragraph}
        </p>
      </div>
    </div>
  );
};

export default CardHorizontal;

const cards = [
  {
    url: image1,
    title: "FILMS",
    paragraph:
      "We believe technology can dramatically improve the experience of managing health, and — when crafted with empathy, intention, and expertise — impact lives at scale.",
    id: 1,
  },
  {
    url: image2,
    title: "MUSIC",
    paragraph:
      "We believe technology can dramatically improve the experience of managing health, and — when crafted with empathy, intention, and expertise — impact lives at scale.",
    id: 2,
  },
  {
    url: image3,
    title: "SHOWS",
    paragraph:
      "We believe technology can dramatically improve the experience of managing health, and — when crafted with empathy, intention, and expertise — impact lives at scale.",
    id: 3,
  },
  {
    url: image4,
    title: "DOCUS",
    id: 4,
    paragraph:
      "We believe technology can dramatically improve the experience of managing health, and — when crafted with empathy, intention, and expertise — impact lives at scale.",
  },
  {
    url: image3,
    title: "LIVE EXPERIENCES",
    id: 5,
    paragraph:
      "We believe technology can dramatically improve the experience of managing health, and — when crafted with empathy, intention, and expertise — impact lives at scale.",
  },
];
