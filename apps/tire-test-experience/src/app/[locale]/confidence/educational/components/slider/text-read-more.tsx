"use client";
import { gsap } from "gsap";
import React, { useState, useRef, useEffect } from "react";

const TextWithReadMore = ({ readMore }: { readMore?: string }) => {
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const handleReadMoreClick = () => {
    setIsReadMoreExpanded(true);

    if (textRef.current) {
      gsap.to(textRef.current, {
        maxHeight: "none",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  useEffect(() => {
    if (textRef.current && !isReadMoreExpanded) {
      textRef.current.style.maxHeight = "5rem";
    }
  }, [isReadMoreExpanded]);

  return (
    <div className="relative">
      <div
        ref={textRef}
        className="relative text-white font-opensans mb-10"
        style={{
          overflow: "hidden",
          transition: "max-height 0.5s ease-in-out",
        }}
      >
        {readMore}
        {!isReadMoreExpanded && <div className="gradient-overlay" />}
      </div>
      {!isReadMoreExpanded && readMore && (
        <button
          className="text-yellow uppercase underline text-sm mt-2 font-michelin text-[0.875rem] leading-[1rem]"
          onClick={handleReadMoreClick}
        >
          Read More
        </button>
      )}
    </div>
  );
};

export default TextWithReadMore;
