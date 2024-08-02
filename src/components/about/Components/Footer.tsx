import React from "react";
import TextAroundCircle from "./TextAroundCircle";
import AnimateWhenInViewport from "./AnimateWhenInViewport";
import AnimatedButton from "./AnimatedButton";
import FooterGhmzaLogo from "./FooterGhmzaLogo";

const Footer = () => {
  return (
    <footer className="w-100">
      <div className="flex lg:flex-row flex-col md:justify-between md:m-auto md:items-center md:h-auto bg-[#DF1780]">
        <div className="md:m-16">
          <AnimateWhenInViewport
            textToBeAnimated="LOUDER"
            cssClass="flex md:justify-start justify-center font-bold text-[77px] md:text-[87.51px] text-white !font-sf-pro-bold !font-[860]"
          />
          <AnimateWhenInViewport
            textToBeAnimated="THE BETTER"
            cssClass="flex justify-center md:justify-start md:ml-1 font-semibold md:text-[58px] text-[52px] -mt-10 text-white !sf-pro-medium"
          />
          <div className="md:block hidden">
            <AnimatedButton
              customCssStyles={{
                marginLeft: "9px",
                marginTop: "20px",
                backgroundColor: "white",
                border: "none",
                color: "#DF1780",
                padding: "10px 20px",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                fontSize: "15.25px",
                lineHeight: "25.6px",
                fontWeight: "590",
                fontFamily: "SF Pro Medium",
              }}
              text="LET'S GO"
              arrowStyle={{
                marginLeft: "8px",
                transition: "transform 0.3s ease",
                stroke: "#DF1780",
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center md:mr-10 mr-[0.5] mx-5">
          <div className="block md:hidden">
            <AnimatedButton
              customCssStyles={{
                marginLeft: "9px",
                marginTop: "20px",
                backgroundColor: "white",
                border: "none",
                color: "#DF1780",
                padding: "10px 20px",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                alignItems: "center",
                fontSize: "15.25px",
                lineHeight: "25.6px",
                fontWeight: "590",
                fontFamily: "SFProDisplay, sans-serif",
              }}
              text="LET'S GO"
              arrowStyle={{
                marginLeft: "8px",
                transition: "transform 0.3s ease",
                stroke: "#DF1780",
              }}
            />
          </div>
          <div className="flex justify-end gap-x-7 items-center">
            <div className="block md:hidden -mr-10">
              <FooterGhmzaLogo height="50" width="50" />
            </div>
            <div className="md:block hidden -mr-10">
              <FooterGhmzaLogo height="120" width="120" />
            </div>
            <div className="md:w-[200px] w-[90px] md:block hidden">
              <TextAroundCircle
                className="footer-circular-text"
                id="footer-text-right-circle1"
                text=" WELCOME TO A NEW ERA OF CARE *** WELCOME TO A NEW ERA OF CARE *** "
                key={1}
                width={200}
                height={200}
                radius={43.3}
                strokeColor="white"
                strokeWidth={2}
                fontSize={10}
              />
            </div>
            <div className="md:w-[200px] w-[90px] md:hidden block">
              <TextAroundCircle
                className="footer-circular-text"
                id="footer-text-right-circle"
                text=" WELCOME TO A NEW ERA OF CARE *** WELCOME TO A NEW ERA OF CARE *** "
                key={1}
                width={100}
                height={100}
                radius={21.3}
                strokeColor="white"
                strokeWidth={2}
                fontSize={4}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
