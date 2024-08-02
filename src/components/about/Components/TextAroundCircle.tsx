import React, { useEffect, useRef } from 'react';

interface TextAroundCircleProps {
  id: string;
  className?: string;
  text: string;
  width: number;
  height: number;
  radius: number;
  strokeColor: string;
  strokeWidth: number;
  fill?: string;
  fontSize: number;
  textColor?: string;
}

const TextAroundCircle: React.FC<TextAroundCircleProps> = ({
  id,
  className,
  text,
  width,
  height,
  radius,
  strokeColor,
  strokeWidth,
  fill,
  fontSize,
  textColor
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      const textPath = svgElement.querySelector('textPath');
      const path = svgElement.querySelector(`#${id}`) as SVGPathElement;

      if (textPath && path) {
        const pathLength = path.getTotalLength();
        const textLength = textPath.getComputedTextLength();
        const spacing = (pathLength - textLength) / (text.length + 1);

        textPath.setAttribute('letter-spacing', spacing.toString());
        textPath.setAttribute('startOffset', '0');
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineWidth = 2;
          ctx.strokeStyle = fill || 'white';
          ctx.lineCap = 'round';

          const squareSize = 40;
          const tailLength = 38;
          const arcSize = 16.67;

          const startX = 50;
          const startY = (100 - tailLength) / 2;
          const endX = startX;
          const endY = startY + tailLength;
          const arrowLength = arcSize;
          const angle = Math.atan2(endY - startY, endX - startX);

          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(startX, startY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(startX, startY);

          const arrowPoint1X = endX - arrowLength * Math.cos(angle - Math.PI / 3);
          const arrowPoint1Y = endY - arrowLength * Math.sin(angle - Math.PI / 10);
          const arrowPoint2X = endX - arrowLength * Math.cos(angle + Math.PI / 3);
          const arrowPoint2Y = endY - arrowLength * Math.sin(angle + Math.PI / 10);

          ctx.quadraticCurveTo(
            endX - arcSize * Math.cos(angle),
            endY - arcSize * Math.sin(angle),
            arrowPoint1X,
            arrowPoint1Y
          );
          ctx.moveTo(startX, startY);
          ctx.quadraticCurveTo(
            endX - arcSize * Math.cos(angle),
            endY - arcSize * Math.sin(angle),
            arrowPoint2X,
            arrowPoint2Y
          );

          ctx.stroke();
        }
      }
    }
  }, []);

  return (
    <svg ref={svgRef} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
      <circle
        cx={width / 2}
        cy={height / 2}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fill || 'none'}
      />

      <path
        id={id}
        d={`M ${width / 2}, ${(height / 2) + (radius / 0.866)}
          a ${radius / 0.866},${radius / 0.866} 0 1,1 0,${-1 * (radius / 0.866) * 2}
          a ${radius / 0.866},${radius / 0.866} 0 1,1 0,${(radius / 0.866) * 2}`}
        fill={fill || 'none'}
      />

      <text className={className} fill={textColor || 'white'}>
        <textPath xlinkHref={`#${id}`} startOffset="0%" fontSize={fontSize}>
          {text}
        </textPath>
      </text>

      <foreignObject x={(width / 2) - 50} y={(height / 2) - 50} width="100" height="100">
        <canvas ref={canvasRef} id={id} width="100" height="100"></canvas>
      </foreignObject>
    </svg>
  );
};

export default TextAroundCircle;
