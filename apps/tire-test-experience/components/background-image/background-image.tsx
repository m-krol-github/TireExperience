import Image from "next/image";

type BackgroundImageProps = {
  backgroundImage: string;
  backgroundImageLg: string;
  backgroundImageAlt: string;
};

const BackgroundImage = ({
  backgroundImage,
  backgroundImageLg,
  backgroundImageAlt,
}: BackgroundImageProps) => (
  <div className="absolute inset-0">
    <div className="relative h-full z-0">
      <Image
        src={backgroundImageLg}
        alt={backgroundImageAlt}
        fill
        className="hidden md:block object-cover"
      />
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        className="md:hidden object-cover"
      />
    </div>
  </div>
);

export default BackgroundImage;
