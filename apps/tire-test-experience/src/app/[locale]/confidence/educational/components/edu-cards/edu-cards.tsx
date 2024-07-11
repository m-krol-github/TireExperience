import React from "react";

import { ModalA11yProps } from "@apps/tire-test-experience/components/modal/modal";
import TextWithBackgroundAsTitle, {
  EduHeroTextProps,
} from "@apps/tire-test-experience/components/text-with-bg-as-title/text-with-background-as-title";
import { ComponentProps } from "@apps/tire-test-experience/src/app/types/content-config";

import { EduCard } from "./edu-card";

export type EduCardsProps = {
  title: string;
  subtitle: string;
  cards: EduCard[];
  headingColor?: EduHeroTextProps["textColor"];
  modalA11yProps?: ModalA11yProps;
};

export type EduCardsComponent = ComponentProps<"EduCards", EduCardsProps>;

export const EduCards = ({
  title,
  subtitle,
  headingColor,
  cards,
  modalA11yProps,
}: EduCardsProps) => {
  return (
    <section className="bg-dark-blue-bg py-52 min-h-screen overflow-x-hidden">
      <TextWithBackgroundAsTitle
        title={title}
        subtitle={subtitle}
        textColor={headingColor}
        outlineTextColor="white"
      />
      <div className="px-4 max-w-[1210px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 relative z-50 mt-5">
          {cards.map((card, index) => (
            <EduCard
              {...card}
              key={index}
              cornerText={`${index + 1}`}
              modalA11yProps={modalA11yProps}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
