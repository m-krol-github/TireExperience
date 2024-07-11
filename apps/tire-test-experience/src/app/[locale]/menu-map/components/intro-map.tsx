"use client";
import NextImage from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import InteractiveMap from "./interactive-map";
import MobileGamesSwiper from "./mobile-swiper";
import TextWithBackgroundAsTitle from "../../../../../components/text-with-bg-as-title/text-with-background-as-title";
import { IntroMapProps } from "../types/types";

const IntroMap = ({
  title,
  mainImage,
  mainImageAlt,
  backgroundImage,
  backgroundImageLg,
  backgroundImageAlt,
  games,
  locale,
}: IntroMapProps) => {
  const searchParams = useSearchParams();
  const gameSearchParams = searchParams.get("game");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGame(gameSearchParams);
  }, [gameSearchParams]);

  return (
    <div className="relative h-screen bg-blue text-center overflow-x-hidden pt-28">
      <div className="absolute inset-0">
        <div className="relative h-full z-0">
          <NextImage
            src={backgroundImageLg}
            alt={backgroundImageAlt}
            layout="fill"
            objectFit="cover"
            className="hidden md:block"
          />
          <NextImage
            src={backgroundImage}
            alt={backgroundImageAlt}
            layout="fill"
            objectFit="cover"
            className="md:hidden"
          />
        </div>
      </div>
      <TextWithBackgroundAsTitle
        title={title}
        beforeTitle="the"
        afterTitle="experience"
      />
      <div className="absolute inset-0 h-full z-0 overflow-hidden">
        {!selectedGame && <MobileGamesSwiper games={games} locale={locale} />}
        <InteractiveMap
          mainImage={mainImage}
          mainImageAlt={mainImageAlt}
          games={games}
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
          locale={locale}
          moreButton="More levels"
        />
      </div>
    </div>
  );
};

export default IntroMap;
