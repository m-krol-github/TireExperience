import { StaticImageData } from "next/image";

import { ComponentProps } from "@apps/tire-test-experience/src/app/types/content-config";

import { EduCardsProps } from "../components/edu-cards/edu-cards";

export type EduHeroProps = {
  title: string;
  subtitle: string;
  paragraphText: string;
  backgroundImage: StaticImageData;
  backgroundImageLg: StaticImageData;
  buttonImage: StaticImageData;
  mainImage: StaticImageData;
  mainImageMobile: StaticImageData;
  backgroundImageAlt: string;
  buttonImageAlt: string;
  mainImageAlt: string;
};
export type EduSliderProps = {
  slides: EduSlider[];
};
export type EduSlider = {
  title: string;
  subtitle: string;
  videoSrc: string;
  videoSafariSrc: string;
  featureImages?: { src: string; alt: string }[];
  circleAroundFeatureIcon?: string;
  mainText: string;
  subText: string;
  features?: { title: string; description: string }[];
  featuresArrowIcon?: string;
  featuresArrowIconAlt?: string;
  slideIndex: number;
  readMore?: string;
};
export type EduTutorialProps = {
  subtitle: string;
  title: string;
  playIcon: string;
  arrowIcon: string;
  closeIcon: string;
  videos: {
    id: string;
    src: string;
    customText: string;
    placeholderImgAlt?: string;
    placeholderImgSrc?: string;
  }[];
};
export type SlideProps = {
  title: string;
  subtitle: string;
  mainText: string;
  subText: string;
  featureImages?: { src: string; alt?: string }[];
  features?: { title: string; description: string }[];
  videoSrc: string;
  videoSafariSrc: string;
  textRef?: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  featuresArrowIcon?: string | undefined;
  slideIndex: number;
  featuresArrowIconAlt?: string;
  readMore?: string;
};

export type EduHeroComponent = ComponentProps<"EduHero", EduHeroProps>;

export type SliderComponent = ComponentProps<"EduSlider", EduSliderProps>;
export type TutorialComponent = ComponentProps<"EduTutorial", EduTutorialProps>;
export type EduCardsComponent = ComponentProps<"EduCards", EduCardsProps>;
