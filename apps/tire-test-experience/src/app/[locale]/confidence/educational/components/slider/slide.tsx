"use-client";
import { gsap } from "gsap";
import React, { useEffect, useState } from "react";

import ImageFeatureComponent from "./image-feature";
import FeatureComponent from "./text-feature";
import TextWithReadMore from "./text-read-more";
import {
  Heading,
  SharedParagraph,
  SharedSubText,
} from "../../../../../../../components/shared-text";
import Video from "../../../../../../../components/video";
import { SlideProps } from "../../types/types";

const Slide = ({
  videoSrc,
  videoSafariSrc,
  subtitle,
  title,
  mainText,
  subText,
  featureImages = [],
  features = [],
  textRef,
  videoRef,
  featuresArrowIcon,
  slideIndex,
  featuresArrowIconAlt,
  readMore,
}: SlideProps) => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const featureTexts = document.querySelectorAll(
      `.slide-${slideIndex} .feature-text`
    );

    if (featureTexts.length > 0) {
      featureTexts.forEach((text, index) => {
        gsap.to(text, {
          opacity: index === activeFeatureIndex ? 1 : 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      });
    }
  }, [activeFeatureIndex, slideIndex]);

  const handleFeatureClick = (index: number) => {
    setActiveFeatureIndex(index);
  };

  return (
    <div
      className={`slide slide-${slideIndex} flex flex-col-reverse md:flex-row justify-center w-full`}
    >
      <div
        className="main-content md:ml-36 md:w-1/2 flex flex-col justify-center align-center gap-4"
        ref={textRef}
      >
        <div className="md:h-screen flex justify-center items-start flex-col gap-2 max-w-lg">
          <div className="hidden md:flex md:flex-col gap-2">
            <Heading level="h5" size="h5" data-testid="subtitle">
              {subtitle}
            </Heading>
            <Heading level="h3" size="h3" data-testid="title">
              {title}
            </Heading>
          </div>
          <div className="my-4">
            <SharedParagraph data-testid="mainText">{mainText}</SharedParagraph>
          </div>
          {readMore && <TextWithReadMore readMore={readMore} />}
          {!readMore && (
            <SharedSubText data-testid="subText">{subText}</SharedSubText>
          )}
        </div>
        <div className="flex md:h-screen flex-col justify-center gap-6 text-center items-center md:items-start">
          <div className="flex md:flex-wrap justify-center gap-9 flex-row mb-48 md:mb-0 relative">
            {featureImages?.map((image, index) => (
              <div
                key={index}
                className="md:relative flex flex-col items-center"
              >
                <ImageFeatureComponent
                  src={image.src}
                  alt={`Feature Image ${index + 1}`}
                  index={index}
                  isActive={index === activeFeatureIndex}
                  onClick={() => handleFeatureClick(index)}
                  data-testid={`featureImage-${index}`}
                />
                <div
                  className={`feature-text mt-28 -translate-x-1/2 left-1/2 md:translate-y-0 md:translate-x-0 md:top-auto md:left-auto absolute transition-opacity duration-500 ease-in-out flex flex-col justify-center items-center gap-4 ${
                    index === activeFeatureIndex ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ opacity: index === activeFeatureIndex ? 1 : 0 }}
                  data-testid={`featureText-${index}`}
                >
                  <FeatureComponent
                    feature={features[index]}
                    arrowIcon={featuresArrowIcon}
                    arrowAlt={featuresArrowIconAlt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:h-screen w-full flex justify-start items-center">
        <Video ref={videoRef} src={videoSrc} safariSrc={videoSafariSrc} />
      </div>
      <div className="flex md:hidden flex-col align-middle justify-center text-center gap-4">
        <h2 className="slide-indicator full-width md:text-h2 text-center justify-center font-michelinBlack font-semibold flex gap-2 text-mobile-h2 text-white">
          <span className="h-1 w-6 text-yellow">-</span>
          <span className="font-michelin">{slideIndex + 1}</span>
          <span className="h-1 w-6 text-yellow">-</span>
        </h2>
        <Heading level="h5" size="h5" data-testid="mobileSubtitle">
          {subtitle}
        </Heading>
        <Heading level="h3" size="h3" data-testid="mobileTitle">
          {title}
        </Heading>
      </div>
    </div>
  );
};

export default Slide;
