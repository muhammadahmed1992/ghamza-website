// TextAnimation.tsx

import React, { useEffect, useRef } from 'react';

interface TextAnimation{
    textToBeAnimated : string,
    cssClass: string,
    styles?: React.CSSProperties
}

const AnimateWhenInViewport: React.FC<TextAnimation> = ({textToBeAnimated, cssClass, styles }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = textToBeAnimated;
    const container = containerRef.current;

    if (container) {
      // Clear previous content if any
      container.innerHTML = '';

      // Split text into individual spans, preserving white spaces
      text.split('').forEach(char => {
        const span = document.createElement('span');
        if (char === ' ') {
          span.innerHTML = '&nbsp;';
        } else {
          span.textContent = char;
        }
        container.appendChild(span);
      });

      // Intersection Observer to trigger animation when in view
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const spans = container.querySelectorAll('span');
            spans.forEach((span, index) => {
              setTimeout(() => {
                span.classList.add('visible');
              }, index * 50); // Delay each letter
            });
            observer.unobserve(container);
          }
        });
      });

      observer.observe(container);
    }
  }, []);

  return (
    <div className={cssClass} style={{...styles}}>
      <span className="animated-text" ref={containerRef}></span>
    </div>
  );
};

export default AnimateWhenInViewport;
