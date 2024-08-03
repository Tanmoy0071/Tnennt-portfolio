"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import Image from "next/image";

const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 ">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          onClick={() => handleClick(card)}
          className={cn(
            card.className,
            "relative overflow-hidden",
            selected?.id === card.id
              ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
              : lastSelected?.id === card.id
              ? "z-40 bg-white rounded-xl h-full w-full"
              : "bg-white rounded-xl h-full w-full"
          )}
          layoutId={`card-${card.id}`}
        >
          {selected?.id === card.id && <SelectedCard selected={selected} />}
          <ImageComponent card={card} />
        </motion.div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            onClick={handleOutsideClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 cursor-pointer"
          >
            <div className="absolute inset-0 z-50 w-full h-full">
              <div className="flex items-center justify-center w-full h-full">
                <SelectedCard selected={selected} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <Image
      src={card.thumbnail}
      height="500"
      width="500"
      className="object-cover w-full h-full rounded-xl group-hover/card:scale-110 transition-all duration-500"
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-[60%] w-[60%] z-40 rounded-lg relative">
      <div className="absolute inset-0 h-full w-full bg-black opacity-80 z-10 rounded-lg" />
      <div className="absolute inset-0 h-full w-full z-20 flex items-center justify-center text-white">
        {selected?.content}
      </div>
    </div>
  );
};

export default LayoutGrid;