import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const SidebarSliderIndicator = ({ totalSlides }: { totalSlides: number }) => {
  const indicatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const indicators = indicatorsRef.current?.children;

    if (!indicators) {
      return;
    }

    const triggerAnimation = (index: number) => {
      gsap.to(indicators, {
        fontSize: "22px",
        color: "#AAAAAA",
        duration: 0.3,
      });
      gsap.to(indicators[index], {
        fontSize: "32px",
        color: "#FFFFFF",
        duration: 0.3,
      });
      Array.from(indicators).forEach((indicator, i) => {
        const hrElement = indicator.querySelector("hr");

        if (i === index) {
          gsap.to(hrElement, {
            width: "24px",
            duration: 0.3,
            display: "block",
          });
        } else {
          gsap.to(hrElement, { width: "0%", duration: 0.3, display: "none" });
        }
      });
    };

    const scrollTriggerConfig = (index: number) => ({
      trigger: `.slide-${index}`,
      start: "top center",
      end: "bottom center",
      onEnter: () => triggerAnimation(index),
      onEnterBack: () => triggerAnimation(index),
      onLeave: () =>
        gsap.to(indicators[index], {
          fontSize: "22px",
          color: "#AAAAAA",
          duration: 0.3,
        }),
      onLeaveBack: () =>
        gsap.to(indicators[index], {
          fontSize: "22px",
          color: "#AAAAAA",
          duration: 0.3,
        }),
    });

    for (let i = 0; i < totalSlides; i++) {
      ScrollTrigger.create(scrollTriggerConfig(i));
    }
  }, [totalSlides]);

  useEffect(() => {
    const sidebar = indicatorsRef.current;

    if (!sidebar) {
      return;
    }

    gsap.set(sidebar, {
      position: "absolute",
      top: "calc(50% - 96px)",
      left: 0,
      opacity: 0,
    });

    ScrollTrigger.create({
      trigger: ".slider-desktop",
      start: "top center",
      end: "bottom center",
      onEnter: () =>
        gsap.to(sidebar, {
          opacity: 1,
          position: "fixed",
          top: "calc(50% - 96px)",
          left: "2rem",
          duration: 0.5,
        }),
      onLeaveBack: () =>
        gsap.to(sidebar, {
          opacity: 0,
          position: "absolute",
          top: "calc(50% - 96px)",
          left: "2rem",
          duration: 0.5,
        }),
      onLeave: () =>
        gsap.to(sidebar, {
          opacity: 0,
          position: "absolute",
          top: "calc(50% - 96px)",
          left: "2rem",
          duration: 0.5,
        }),
    });
  }, []);

  return (
    <div ref={indicatorsRef} className="sidebar w-1/6 text-center left-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <h2
          key={index}
          className="slide-indicator full-width md:text-h2 text-center justify-start font-michelinBlack font-semibold items-center flex gap-4 text-mobile-h2"
        >
          <hr
            className="h-1 w-6 bg-yellow"
            style={{ display: index === 0 ? "block" : "none" }}
          />
          <span className="font-michelin">{index + 1}</span>
        </h2>
      ))}
    </div>
  );
};

export default SidebarSliderIndicator;
