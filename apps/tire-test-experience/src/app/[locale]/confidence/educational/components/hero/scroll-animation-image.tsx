"use client";
import { throttle } from "lodash";
import NextImage from "next/image";
import React, { useRef, useEffect, useState } from "react";

interface ScrollAnimationImageProps {
  src: string;
  alt: string;
  srcMobile: string;
}

const ScrollAnimationImage = ({
  src,
  srcMobile,
  alt,
}: ScrollAnimationImageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [scaled, setScaled] = useState(true);
  const defaultScaleDesktop = 1.5;
  const defaultScaleMobile = 1.25;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const defaultScale = isMobile ? defaultScaleMobile : defaultScaleDesktop;
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollThresholdDown = 0;
      const scrollThresholdUp = 0;

      if (scrollY > scrollThresholdDown && scaled) {
        setScaled(false);
      } else if (scrollY <= scrollThresholdUp && !scaled) {
        setScaled(true);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scaled]);

  useEffect(() => {
    if (imageRef.current) {
      const scale = scaled ? defaultScale : 1;
      imageRef.current.style.transform = `scale(${scale})`;
    }
  }, [scaled, defaultScale]);

  return (
    <div
      className={`relative transition-transform duration-1000 ease-out mt-0 flex flex-col items-center origin-top justify-center`}
      ref={imageRef}
      style={{ transform: `scale(${defaultScale})` }}
    >
      <div className="w-full overflow-visible max-w-xl">
        <NextImage
          src={src}
          alt={alt}
          width={880}
          height={880}
          className="w-full object-cover hidden md:block"
        />
        <NextImage
          src={srcMobile}
          alt={alt}
          width={414}
          height={414}
          className="w-full object-cover md:hidden"
        />
      </div>
    </div>
  );
};

export default ScrollAnimationImage;
