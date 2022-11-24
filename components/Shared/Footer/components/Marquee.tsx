import React, { useRef } from "react";
// 1. Importing framer-motion
import { motion } from "framer-motion";

// 2. Defining Variants
const marqueeVariants = {
  animate: {
    x: [0, -1036],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 5,
        ease: "linear",
      },
    },
  },
};
const Marquee = () => {
  return (
    <div>
      {/* 3. Using framer motion */}
      <motion.div
        className="track"
        variants={marqueeVariants}
        animate="animate"
      >
        <h1>OK OK OK OK ON OK OK OK O OK OK OK K O OK Work Together.</h1>
      </motion.div>
    </div>
  );
};
export default Marquee;
