"use client";

import { throttle } from "lodash";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ScrollFadeInComponentProps {
  paragraphText: string;
  buttonImage: string;
  buttonImageAlt: string;
  className?: string;
}

const ScrollFadeInComponent = ({
  paragraphText,
  buttonImage,
  buttonImageAlt,
  className,
}: ScrollFadeInComponentProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${className} relative text p-6 md:flex md:flex-row md:justify-between transition-opacity duration-1000 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="text-white mt-4 md:text-left md:max-w-lg">
        {paragraphText}
      </p>
      <button className="mt-4">
        <Image src={buttonImage} alt={buttonImageAlt} width={50} height={50} />
      </button>
    </div>
  );
};

export default ScrollFadeInComponent;
