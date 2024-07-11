"use client";
import { throttle } from "lodash";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import BulletLinkButton from "./bullet-link-button";
import MapLabel from "./map-label";
import { MapProps } from "../types/types";
import { Game } from "../types/types";
import {
  scaleCoordinates,
  calculateTooltipPosition,
} from "../utils/calculate-tooltip-position";

const InteractiveMap = ({
  mainImage,
  mainImageAlt,
  games,
  selectedGame,
  setSelectedGame,
  locale,
  moreButton,
}: MapProps) => {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const [originalImageDimensions, setOriginalImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [hoveredGame, setHoveredGame] = useState<Game | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState("");

  const handleMouseEnter = useCallback(
    (game: Game) => {
      setTooltip(game.slug);
      const position = calculateTooltipPosition(game.coords, (coords) =>
        scaleCoordinates(coords, originalImageDimensions, imageDimensions)
      );
      setTooltipPosition(position);
      setHoveredGame(game);
    },
    [originalImageDimensions, imageDimensions]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Set the actual dimensions of the image once it's loaded
  const handleImageLoad = useCallback(() => {
    if (imgRef.current && imgRef.current.complete) {
      setImageDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    handleImageLoad();
  }, [handleImageLoad]);

  // Load the image and set its original dimensions
  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setOriginalImageDimensions({
        width: img.width,
        height: img.height,
      });
    };

    img.src = mainImage.src;
  }, [mainImage.src]);

  const [selectedGameObject, setSelectedGameObject] = useState<Game | null>(
    null
  );

  useEffect(() => {
    const game = games.find((game) => game.slug === selectedGame);
    setSelectedGameObject(game || null);
  }, [games, selectedGame]);

  const style = useMemo(() => {
    let style;

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      style = { top: "20%", left: 0, width: "100%" };
    } else {
      switch (selectedGameObject?.buttonsPosition) {
        case "center": {
          style = { top: "15%", left: 0, width: "100%" };
          break;
        }

        case "left": {
          style = { top: "40%", left: "5%" };
          break;
        }

        case "right": {
          style = { top: "40%", right: "5%" };
          break;
        }

        default: {
          style = {};
        }
      }
    }

    return style;
  }, [selectedGameObject]);

  const handleMoreClick = () => {
    setSelectedGame(null);
    router.push(window.location.pathname);
  };

  useEffect(() => {
    const handleResize = () => {
      const ratio = window.innerWidth / window.innerHeight;

      if (ratio < 0.9) {
        setTranslate("0, -75%");
      } else if (ratio >= 0.9 && ratio < 1.2) {
        setTranslate("0, -50%");
      } else if (ratio >= 1.2 && ratio < 1.45) {
        setTranslate("0, -30%");
      } else if (ratio >= 1.2 && ratio < 1.7) {
        setTranslate("0, -15%");
      } else if (ratio >= 1.7 && ratio < 2.1) {
        setTranslate("0, 0");
      } else if (ratio >= 2.1 && ratio < 2.5) {
        setTranslate("0, 10%");
      } else if (ratio >= 2.5) {
        setTranslate("0, 15%");
      }
    };

    const throttledHandleResize = throttle(handleResize, 100);

    window.addEventListener("resize", throttledHandleResize);
    throttledHandleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className={`hidden md:block absolute z-10`}
        style={{
          bottom: selectedGameObject ? selectedGameObject?.bottom : "-47%",
          left: selectedGameObject ? selectedGameObject?.left : "5vw",
          width: selectedGameObject ? "140vw" : "90vw",
          transition: "all 0.5s ease",
          transform: selectedGameObject ? "" : `translate(${translate})`,
        }}
      >
        <div style={{ position: "relative" }}>
          <NextImage
            ref={imgRef}
            src={
              hoveredGame
                ? hoveredGame.mainImage
                : selectedGameObject
                ? selectedGameObject.mainImage
                : mainImage
            }
            alt={
              selectedGameObject
                ? selectedGameObject.mainImageAlt
                : mainImageAlt
            }
            onLoad={handleImageLoad}
            className="w-full"
            priority={true}
          />

          {!selectedGameObject && (
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: imageDimensions.width,
                height: imageDimensions.height,
              }}
            >
              {games.map((game) => {
                const scaledCoords = scaleCoordinates(
                  game.coords,
                  originalImageDimensions,
                  imageDimensions
                );

                return (
                  <Link
                    key={game.slug}
                    href={`/${locale}/${game.slug}`}
                    title={game.slug}
                  >
                    <polygon
                      points={scaledCoords.join(",")}
                      fill="transparent"
                      onMouseEnter={() => handleMouseEnter(game)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </Link>
                );
              })}
            </svg>
          )}
        </div>

        {!selectedGameObject && tooltip && (
          <div
            onMouseEnter={() => setTooltip(tooltip)}
            onMouseLeave={handleMouseLeave}
          >
            <MapLabel
              title={tooltip}
              left={tooltipPosition.x}
              top={tooltipPosition.y}
              href={`/${locale}/${tooltip}`}
            />
          </div>
        )}
      </div>
      {selectedGameObject && (
        <>
          <div
            className={`flex flex-col items-center fixed z-20`}
            style={style}
          >
            <BulletLinkButton
              text={`${selectedGameObject.title}`}
              href={`/${locale}/${selectedGameObject.title}}`}
            />
            <div className="h-4" />
            <button
              className="relative font-michelin italic font-bold h-[40px] rounded-[20px] flex justify-items-center
                items-center text-[16px] px-4 md:px-8 bg-transparent text-white border border-white hover:bg-white hover:text-black cursor-pointer"
              onClick={handleMoreClick}
            >
              {moreButton}
            </button>
          </div>
          <div
            className={`md:hidden h-full absolute z-10`}
            style={{
              bottom: selectedGameObject.mobileBottom,
              left: selectedGameObject.mobileLeft,
              width: "200vw",
            }}
          >
            <NextImage
              src={selectedGameObject.mainImage}
              alt={selectedGameObject.mainImageAlt}
              className="w-full h-auto relative"
            />
          </div>
        </>
      )}
    </>
  );
};

export default InteractiveMap;
