import React from 'react';
import { motion } from 'framer-motion';

const TextTwirlAnimation = (props) => {
  // Split the text into individual words
  const words = props.text.split(' ');

  // Variants for animation
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1, // Delay between each word animation
        staggerDirection: 1, // Start from the first word to the last
      },
    },
  };

  const wordVariants = {
    initial: {
      y: 20, // Initial position off-screen (bottom to top effect)
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const sentenceVariants = {
    animate: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.2, // Delay for sentence animation to start after words
      },
    },
  };

  return (
    <motion.div
      variants={sentenceVariants}
      initial="initial"
      animate="animate"
      className={props.customClassName}
      style={props.Style}
    >
      {words.map((word, index) => (
        <motion.div key={index} variants={containerVariants} style={{ display: 'inline-block' }}>
          <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
            {word}&nbsp;
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TextTwirlAnimation;
