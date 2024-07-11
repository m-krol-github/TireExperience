"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

import SidebarSliderIndicator from "./sidebar-slider-indication";
import Slide from "./slide";
import { EduSlider } from "../../types/types";

gsap.registerPlugin(ScrollTrigger);

const Slider = ({ slides }: { slides: EduSlider[] }) => {
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const textRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (!sliderElement) {
      return;
    }

    videoRefs.forEach((videoRef, i) => {
      const videoElement = videoRef.current;

      if (!videoElement) {
        return;
      }

      const setupScrollTrigger = () => {
        const duration = videoElement.duration || 1;
        const slideElement = document.querySelector(`.slide-${i}`);

        if (!slideElement) {
          return;
        }

        const slideHeight = slideElement.clientHeight || 1;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: slideElement,
            start: "130 top",
            end: () => (window.innerWidth >= 768 ? `center top` : `bottom top`),
            scrub: true,
            pin: videoElement,
            pinSpacing: false,
            onLeave: () => {
              gsap.to(videoElement, {
                x: "0",
                y: "100",
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  videoElement.style.display = "none";
                },
              });
            },
            onEnterBack: () => {
              gsap.set(videoElement, {
                display: "block",
                x: "0",
                y: "0",
                opacity: 1,
              });
              gsap.to(videoElement, { currentTime: duration, duration: 0 });
            },
          },
        });

        timeline.to(videoElement, {
          currentTime: duration,
          ease: "none",
          duration: slideHeight / window.innerHeight,
        });

        return timeline;
      };

      if (videoElement.readyState >= 1) {
        setupScrollTrigger();
      } else {
        videoElement.onloadedmetadata = setupScrollTrigger;
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="slider-desktop p-4 bg-blue-background flex flex-row justify-center align-center gap-4 relative w-100"
    >
      <div className="hidden md:flex">
        <SidebarSliderIndicator totalSlides={slides?.length} />
      </div>
      <div className="flex flex-col w-full">
        {slides?.map((slide, index) => (
          <Slide
            key={index}
            textRef={textRefs[index]}
            videoRef={videoRefs[index]}
            {...slide}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
