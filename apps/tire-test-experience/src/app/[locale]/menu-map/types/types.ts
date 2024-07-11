import { StaticImageData } from "next/image";

import { ComponentProps } from "@apps/tire-test-experience/src/app/types/content-config";

export type IntroMapProps = {
  title: string;
  mainImage: StaticImageData;
  mainImageAlt: string;
  backgroundImage: StaticImageData;
  backgroundImageLg: StaticImageData;
  backgroundImageAlt: string;
  games: Game[];
  locale?: string;
};

export type Game = {
  title: string;
  slug: string;
  mainImage: StaticImageData;
  mainImageAlt: string;
  gameThumbnail: StaticImageData;
  gameThumbnailAlt: string;
  bottom: string;
  left: string;
  mobileBottom: string;
  mobileLeft: string;
  buttonsPosition?: "center" | "left" | "right";
  coords: number[];
};

export type MapProps = {
  mainImage: StaticImageData;
  mainImageAlt: string;
  games: Game[];
  selectedGame?: string | null;
  setSelectedGame: (game: string | null) => void;
  locale?: string;
  moreButton?: string;
};

export type MapLabelProps = {
  title: string;
  left: number;
  top: number;
  href: string;
};

export type IntroMapComponent = ComponentProps<"IntroMap", IntroMapProps>;
