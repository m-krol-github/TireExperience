import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "./card";
import {
  Heading,
  SharedParagraph,
} from "../../../../../components/shared-text";
import { QuestionSectionProps } from "../types/types";

const QuestionSection = ({
  currentQuestion,
  currentSelections,
  setSelectedOptions,
  isMultipleSelection,
  selectText,
  filteredSecondStepOptions,
  currentStep,
  title,
  titleStep2,
}: QuestionSectionProps & { titleStep2: string }) => {
  const options =
    currentStep === 2 ? filteredSecondStepOptions : currentQuestion.options;

  return (
    <div className="relative z-10 px-4 md:px-8 p-8 w-full flex flex-col items-center">
      <h5 className="text-mobile-h4 md:text-h5 mb-4 text-center font-normal font-michelin md:font-notoSans not-italic text-white/60">
        {currentStep === 1 ? title : titleStep2}
      </h5>
      <Heading
        level="h3"
        size="h3"
        className="text-mobile-h2 mb-4 text-center not-italic"
      >
        {currentQuestion.questionTopPart} <br />
        <span className="text-yellow">
          {currentQuestion.questionBottomPart}
        </span>
      </Heading>
      {currentStep === 1 && (
        <SharedParagraph className="mb-4 text-center">
          {selectText}
        </SharedParagraph>
      )}
      <div className="hidden md:flex flex-wrap justify-center gap-4 mt-14">
        {options.map((option, index) => (
          <Card
            key={option.id}
            currentStep={currentStep}
            index={index}
            options={[option]}
            selectedOptions={currentSelections}
            setSelectedOptions={setSelectedOptions}
            isMultipleSelection={isMultipleSelection}
          />
        ))}
      </div>
      <div className="swiper-questions block md:hidden mt-14 w-full">
        {options.length <= 2 ? (
          <div className="flex flex-row justify-center gap-4">
            {options.map((option, index) => (
              <Card
                key={option.id}
                index={index}
                currentStep={currentStep}
                options={[option]}
                selectedOptions={currentSelections}
                setSelectedOptions={setSelectedOptions}
                isMultipleSelection={isMultipleSelection}
              />
            ))}
          </div>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1.5}
              centeredSlides={true}
              pagination={{ clickable: true, el: ".swiper-pagination" }}
              navigation={{
                prevEl: ".prev-arrow",
                nextEl: ".next-arrow",
              }}
              className="video-slider"
              breakpoints={{
                350: {
                  slidesPerView: 1.5,
                },
                400: {
                  slidesPerView: 2,
                },
              }}
            >
              {options.map((option, index) => (
                <SwiperSlide key={option.id}>
                  <Card
                    currentStep={currentStep}
                    options={[option]}
                    index={index}
                    selectedOptions={currentSelections}
                    setSelectedOptions={setSelectedOptions}
                    isMultipleSelection={isMultipleSelection}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination" />
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
