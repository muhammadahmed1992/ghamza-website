// components/Card.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import { Key } from "react";

// Define a type for the card props
type CardProps = {
  data: {
    id: number;
    title: string;
    hashtags: string[];
    socialAppIcon: string;
    rectangle: string;
    goVegan: string;
    camera: any;
    date: string;
    description: string;
  };
  hover: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const SocialPostsCardView: React.FC<CardProps> = ({ data, hover, onMouseEnter, onMouseLeave }) => {
  return (
    <motion.div
      layout
      initial={{ y: 0 }}
      animate={{ y: hover ? 40 : 0 }}
      transition={{ stiffness: 200 }}
      className="card bg-white !mx-auto !h-[420px] lg:!h-[530px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={data.rectangle} alt={data.title} className="card-image" />
      <div className="card-content">
        <div className="ml-3">
          <div className="flex gap-x-3">
            <img className="-mt-9 -ml-4" src={data.goVegan} alt="" />
            <div className="flex flex-col">
              <h4
                className="-mt-2"
                style={{
                  fontSize: "18px",
                  fontWeight: " 700",
                  lineHeight: "21.09px",
                  fontFamily: "Roboto, sans-serif",
                }}
              >
                GoVegan
              </h4>
              <p
                className="text-[#9CA0AC]"
                style={{
                  fontFamily: " Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "14.06px",
                  textAlign: "left",
                }}
              >
                {data.date}
              </p>
            </div>
          </div>

          <div className="flex mt-5">
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "22px",
              }}
            >
              {data.hashtags.map((item: any, index: any) => {
                return (
                  <span className="text-[blue]" key={index}>
                    {item + " "}
                  </span>
                );
              })}

              {data.description}
            </p>
          </div>
          <Image className="mt-3 mb-4" alt="twitterLogo" src={data.socialAppIcon} width={20} height={20} />
        </div>
      </div>
    </motion.div>
  );
};

export default SocialPostsCardView;
