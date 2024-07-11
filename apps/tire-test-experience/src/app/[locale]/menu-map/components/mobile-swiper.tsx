"use client";
import NextImage from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import slideBg from "@apps/tire-test-experience/public/images/map/slide_bg.png";

import { Game } from "../types/types";

interface MobileGamesSliderProps {
  games: Game[];
  locale?: string;
}

const MobileGamesSwiper = ({ games, locale }: MobileGamesSliderProps) => {
  const [currentGame, setCurrentGame] = useState(games[0]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentGame(games[swiper.realIndex]);
  };

  return (
    <div className="md:hidden relative h-screen">
      <div className="absolute bottom-0 w-full">
        <NextImage
          src={currentGame.mainImage}
          alt={currentGame.mainImageAlt}
          className="w-auto max-h-[40vh] mx-auto h-auto relative"
        />
        <Swiper
          spaceBetween={20}
          slidesPerView={1.3}
          centeredSlides={true}
          slidesOffsetBefore={0}
          slidesOffsetAfter={30}
          onSlideChange={handleSlideChange}
          loop={true}
        >
          {games.map((game, index) => (
            <SwiperSlide key={index}>
              <Link href={`/${locale}/${game.slug}`} className="h-full">
                <div className="relative border border-white rounded-[10px] py-5 mx-auto my-7 bg-white bg-opacity-10">
                  <NextImage
                    src={slideBg}
                    alt="backgroundImageAlt"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="flex flex-col relative">
                    <NextImage
                      src={game.gameThumbnail}
                      alt={game.gameThumbnailAlt}
                      className="w-auto max-h-[40vh] mx-auto h-auto"
                    />
                    <p className="font-michelin italic font-bold text-yellow text-[26px] text-center px-2">
                      {game.title.split(" ")[0]}
                      <br />
                      {game.title.split(" ")[1]}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MobileGamesSwiper;
