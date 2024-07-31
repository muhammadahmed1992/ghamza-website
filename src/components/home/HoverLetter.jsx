import { useState, useEffect } from "react";

function HoverLetter({ text }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [weight, setWeight] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      setWeight(900);
    };

    handleResize(); // Set initial weight based on current window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const textSpans = text?.split("").map((char, index) => (
    <span
      key={index}
      onMouseOver={() => handleHover(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        fontWeight: hoveredIndex === index ? weight : "",
        cursor: "pointer",
        // transition: "font-weight 0.3s ease-in-out",
        // lineHeight: "40px",
      }}
      className="light_text_"
    >
      {char}
    </span>
  ));

  return <span className="  ">{textSpans}</span>;
}

export default HoverLetter;
