import { StaticImageData } from "next/image";

import { ComponentProps } from "@apps/tire-test-experience/src/app/types/content-config";

export type IntroHeroProps = {
  title: string;
  subtitle: string;
  backgroundImage: StaticImageData;
  backgroundImageLg: StaticImageData;
  backgroundImageAlt: string;
  buttonText: string;
  locale?: string;
  beforeTitle?: string;
  afterTitle?: string;
};

export type IntroHeroComponent = ComponentProps<"IntroHero", IntroHeroProps>;
