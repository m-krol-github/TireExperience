import BackgroundImage from "@apps/tire-test-experience/components/background-image/background-image";
import RoundButton from "@apps/tire-test-experience/components/round-button/round-button";

import { IntroHeroProps } from "../types/types";

const IntroHero = ({
  title,
  subtitle,
  backgroundImageLg,
  backgroundImage,
  backgroundImageAlt,
  buttonText,
  locale,
  beforeTitle,
  afterTitle,
}: IntroHeroProps) => {
  return (
    <div className="relative h-screen bg-blue text-center overflow-x-hidden pt-32">
      <BackgroundImage
        backgroundImage={backgroundImage.src}
        backgroundImageLg={backgroundImageLg.src}
        backgroundImageAlt={backgroundImageAlt}
      />
      <div className="relative h-full text-center px-4 py-12 md:px-12 flex flex-col justify-between items-center">
        <h4 className="text-[14px] md:text-[20px] md:font-plusJakartaSans text-white tracking-[0.5rem] md:tracking-[1rem] uppercase">
          {subtitle}
        </h4>
        <div className="relative">
          <span className="absolute top-0 left-0 text-[30px] md:text-[34px] font-semibold font-michelin italic text-white">
            {beforeTitle}
          </span>
          <h1 className="text-[116px] md:text-[144px] font-bold font-michelin italic text-white">
            {title}
          </h1>
          <span className="absolute bottom-0 right-0 text-[30px] md:text-[34px] font-semibold font-michelin italic text-white">
            {afterTitle}
          </span>
        </div>
        <RoundButton text={buttonText} href={`/${locale}/menu-map`} />
      </div>
    </div>
  );
};

export default IntroHero;
