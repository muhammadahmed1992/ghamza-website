import React from "react";

interface ArrowSVGProps {
  arrowHeight?: number;
  color?: string;
  lineWidth?: number;
  direction?: "horizontal" | "vertical";
  width?: string;
}

const ArrowSVG: React.FC<ArrowSVGProps> = ({
  arrowHeight = 50,
  color = "currentColor",
  lineWidth = 2,
  direction = "horizontal",
  width = null,
}) => {
  // Calculate the arrow width based on its height (keeping a fixed ratio, e.g., 2:1)
  const arrowWidth = arrowHeight * 2;

  // Calculate the points for the arrowhead based on the direction
  const headLength = arrowHeight / 5;
  let startX: number, startY: number, endX: number, endY: number;
  let arrowHead1X: number, arrowHead1Y: number, arrowHead2X: number, arrowHead2Y: number;

  if (direction === "horizontal") {
    const centerY = arrowHeight / 2;
    startX = 0;
    startY = centerY;
    endX = arrowWidth / 2;
    endY = centerY;
    arrowHead1X = endX - headLength * Math.cos(Math.PI / 8);
    arrowHead1Y = endY - headLength * Math.sin(Math.PI / 4);
    arrowHead2X = endX - headLength * Math.cos(Math.PI / 8);
    arrowHead2Y = endY + headLength * Math.sin(Math.PI / 4);
  } else {
    const centerX = arrowWidth / 2;
    startX = centerX;
    startY = 0;
    endX = centerX;
    endY = arrowHeight;
    arrowHead1X = endX - headLength * Math.sin(Math.PI / 4);
    arrowHead1Y = endY - headLength * Math.cos(Math.PI / 8);
    arrowHead2X = endX + headLength * Math.sin(Math.PI / 4);
    arrowHead2Y = endY - headLength * Math.cos(Math.PI / 8);
  }

  return (
    <svg width={`${width || arrowWidth}`} height={arrowHeight}>
      {/* Draw the line */}
      <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={lineWidth} />
      {/* Draw the arrowhead */}
      <line x1={endX} y1={endY} x2={arrowHead1X} y2={arrowHead1Y} stroke={color} strokeWidth={lineWidth} />
      <line x1={endX} y1={endY} x2={arrowHead2X} y2={arrowHead2Y} stroke={color} strokeWidth={lineWidth} />
    </svg>
  );
};

export default ArrowSVG;
