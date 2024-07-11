"use client";
import { useRef, useCallback } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperClass } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import VideoSection from "./video-section";

interface SliderProps {
  videos: {
    id: string;
    src: string;
    customText: string;
    placeholderImgAlt?: string;
    placeholderImgSrc?: string;
  }[];
  arrowIcon: string;
  playIcon: string;
  closeIcon: string;
}

const Slider: React.FC<SliderProps> = ({
  videos,
  playIcon,
  arrowIcon,
  closeIcon,
}) => {
  const sliderRef = useRef<SwiperClass | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) {
      return;
    }

    sliderRef.current.slideNext();
  }, []);

  return (
    <section className="relative mb-24 video-slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.1}
        spaceBetween={21}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        navigation={{
          prevEl: ".prev-arrow",
          nextEl: ".next-arrow",
        }}
        onSwiper={(swiper) => (sliderRef.current = swiper)}
        breakpoints={{
          768: {
            slidesPerView: 3.3,
            spaceBetween: 24,
            pagination: false,
          },
        }}
        className="video-slider"
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id}>
            <VideoSection
              id={video.id}
              placeholderImgAlt={video.placeholderImgAlt}
              placeholderImgSrc={video.placeholderImgSrc}
              src={video.src}
              playIcon={playIcon}
              customText={video.customText}
              closeIcon={closeIcon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination md:hidden" />
      <nav
        className="custom-arrows justify-end absolute -bottom-24 w-full right-32 gap-3 hidden md:flex"
        aria-label="Slider Navigation"
      >
        <button
          className="prev-arrow flex justify-center items-center cursor-pointer w-12 h-12 border-white border-2 rounded-lg"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <img
            src={arrowIcon}
            alt="Previous"
            className="transform rotate-180"
          />
        </button>
        <button
          className="next-arrow flex justify-center items-center cursor-pointer w-12 h-12 border-white border-2 rounded-lg"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <img src={arrowIcon} alt="Next" />
        </button>
      </nav>
    </section>
  );
};

export default Slider;
