import ScrollAnimationImage from "./hero/scroll-animation-image";
import ScrollFadeInComponent from "./hero/scroll-fade-in-text";
import BackgroundImage from "../../../../../../components/background-image/background-image";
import TextWithBackgroundAsTitle from "../../../../../../components/text-with-bg-as-title/text-with-background-as-title";
import { EduHeroProps } from "../types/types";

const EduHero = ({
  title,
  subtitle,
  paragraphText,
  mainImage,
  mainImageMobile,
  buttonImage,
  backgroundImageLg,
  backgroundImage,
  backgroundImageAlt,
  mainImageAlt,
  buttonImageAlt,
}: EduHeroProps) => {
  return (
    <div className="relative bg-blue text-center  overflow-x-hidden pt-32">
      <BackgroundImage
        backgroundImage={backgroundImage.src}
        backgroundImageLg={backgroundImageLg.src}
        backgroundImageAlt={backgroundImageAlt}
      />
      <TextWithBackgroundAsTitle title={title} subtitle={subtitle} />
      <div className=" overflow-hidden pb-32">
        <ScrollAnimationImage
          src={mainImage.src}
          alt={mainImageAlt}
          srcMobile={mainImageMobile.src}
        />
        <ScrollFadeInComponent
          className="md:-mt-16"
          paragraphText={paragraphText}
          buttonImage={buttonImage.src}
          buttonImageAlt={buttonImageAlt}
        />
      </div>
    </div>
  );
};

export default EduHero;
