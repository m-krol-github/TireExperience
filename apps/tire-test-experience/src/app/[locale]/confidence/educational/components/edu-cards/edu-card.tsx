/* eslint-disable @next/next/no-img-element */
"use client";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  Modal,
  ModalA11yProps,
} from "@apps/tire-test-experience/components/modal/modal";

export type EduCard = {
  title: string;
  icon: StaticImageData;
  description: string; // back of the cards
  isModal?: boolean; // default cards has flip effect
  cornerText?: string; // number of the card
  modalA11yProps?: ModalA11yProps;
};

export const EduCard = ({
  title,
  icon,
  description,
  isModal,
  cornerText,
  modalA11yProps,
}: EduCard) => {
  const blueFilterForSvg =
    "brightness(0) saturate(100%) invert(12%) sepia(24%) saturate(6158%) hue-rotate(214deg) brightness(100%) contrast(112%)";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isModal && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          modalA11yProps={modalA11yProps}
        >
          <div className="flex flex-col items-center w-full">
            <img
              src={icon.src}
              alt={""}
              className="w-[68px] h-[68px]"
              style={{
                filter: blueFilterForSvg,
              }}
            />
            <span className="text-blue text-[2rem] font-bold  font-michelin">
              {title}
            </span>
            <p className="text-base leading-6 font-openSans text-black text-center mt-12 transi">
              {description}
            </p>
          </div>
        </Modal>
      )}
      <button
        className="cursor-pointer group perspective"
        onClick={isModal ? () => setIsOpen(true) : undefined}
      >
        <div
          className={twMerge(
            "relative  pers rotate-y duration-1000 bg-blue rounded-[10px] border border-white font-michelin items-center",
            !isModal && "preserve-3d group-hover:card-rotate-y-180"
          )}
        >
          <div className="backface-hidden w-full h-full">
            {cornerText && topCornerNumber(cornerText)}
            {cornerText && bottomCornerNumber(cornerText)}
            <div className="my-16 flex items-center flex-col">
              <img src={icon.src} alt={""} className="w-[68px] h-[68px]" />
              <h3 className="text-yellow text-lg font-bold mt-4">{title}</h3>
            </div>
          </div>
          <div className="absolute inset-0 card-rotate-y-180 backface-hidden overflow-hidden flex justify-center items-center">
            {cornerText && topCornerNumber(cornerText)}
            {cornerText && bottomCornerNumber(cornerText)}
            <div className="flex items-center flex-col px-3">
              <span className="text-yellow text-lg font-bold mt-4">
                {title}
              </span>
              <p className="text-xs font-openSans leading-4 text-white text-center mt-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

const topCornerNumber = (text: string) => (
  <span className="absolute top-0 left-0 w-[34px] h-[34px] rounded-tl-[10px] rounded-br-[10px] border border-white flex justify-center items-center text-white text-lg font-bold border-t-0 border-l-0 focus:outline-none">
    {text}
  </span>
);

const bottomCornerNumber = (text: string) => (
  <span className="absolute bottom-0 right-0 w-[34px] h-[34px] rounded-tl-[10px] rounded-br-[10px] border border-white flex justify-center items-center text-white text-lg font-bold border-b-0 border-r-0">
    {text}
  </span>
);
