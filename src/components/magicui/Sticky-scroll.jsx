"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[30rem] w-full overflow-y-auto flex justify-center relative space-x-10 bg-transparent"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="mt-10">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-[2vw] font-bold text-black"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-[1.7vw] text-black max-w-[40vw] mt-5"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-20" />
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block h-[20vw] w-[40vw] rounded-md sticky top-20 overflow-hidden ",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};