import React, { useState } from 'react';

interface AnimatedButtonProps {
  text: string;
  customCssStyles: React.CSSProperties;
  characterAnimationDelay?: number;
  upDownDifferenceAnimationDelay?: number;
  arrowStyle: React.CSSProperties;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ text, customCssStyles, characterAnimationDelay, upDownDifferenceAnimationDelay, arrowStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const characters = text.split('');

  return (
    <button
      className="animated-button "
      style={customCssStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {characters.map((char, index) => (
          <span
            key={index}
            style={{
              animationDelay: `${index *  0.02}s, 
              ${(index * (characterAnimationDelay! || 0.02)) + (upDownDifferenceAnimationDelay! || 0.03)}s`
            }}>
            {char === ' ' ? '\u00A0' : char} {/* Replace space with non-breaking space */}
          </span>
        ))}

      </div>
      <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{...arrowStyle, 
            transform: isHovered ? 'rotate(0deg)' : 'rotate(-45deg)',
            transition: 'transform 0.3s ease' // Smooth transition
          }}>
          <path d="M12 2L22 12L12 22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12H22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
  );
};

export default AnimatedButton;
