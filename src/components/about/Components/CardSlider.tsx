import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

type CardData = {
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

interface CustomSliderProps {
  cards: CardData[];
}

const CustomSlider: React.FC<CustomSliderProps> = ({ cards }) => {
  const settings = {
    className: "center",
    infinite: true,
    speed: 900,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {cards.map((card, index) => (
        <div key={index} className="card-wrapper !flex !justify-center">
          <div className="card shadow-[0px 0px 12.51px 0px #9CA0ACE5]">
            <img src={card.rectangle} alt={card.title} className="card-image " />
            <div className="card-content">
              <div className="ml-3">
                <div className="flex gap-x-3">
                  <img className="-mt-9 -ml-4 w-10" src={card.goVegan} alt="" />
                  <div className="flex flex-col">
                    <h4
                      className="-mt-2"
                      style={{
                        fontSize: "7.5px",
                        fontWeight: "700",
                        lineHeight: "8.70px",
                        fontFamily: "Roboto, sans-serif",
                      }}
                    >
                      {card.title}
                    </h4>
                    <p
                      className="text-[#9CA0AC]"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "5px",
                        fontWeight: "400",
                        lineHeight: "5.86px",
                        textAlign: "left",
                      }}
                    >
                      {card.date}
                    </p>
                  </div>
                </div>
                <div className="flex mt-5">
                  <p
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "5.84px",
                      lineHeight: "9px",
                    }}
                  >
                    {card.hashtags.map((item, index) => (
                      <span className="text-[blue]" key={index}>
                        {item + " "}
                      </span>
                    ))}
                    {card.description}
                  </p>
                </div>
                <Image
                  className="mt-3 mb-4"
                  alt="twitterLogo"
                  src={card.socialAppIcon}
                  width={10}
                  height={10}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlider;
