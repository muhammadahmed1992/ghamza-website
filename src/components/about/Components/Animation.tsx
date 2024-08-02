import React, { useEffect, ReactNode } from 'react';
import { motion, useAnimation, Variants, MotionProps } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedBoxProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variants: Variants;
  initial?: string | false | MotionProps['initial'];
  animate?: string | MotionProps['animate'];
}

const Animation: React.FC<AnimatedBoxProps> = ({
  children,
  className,
  variants,
  initial = 'hidden',
  animate = 'visible',
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      //controls.start(animate);
    }
  }, [controls, inView, animate]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Animation;