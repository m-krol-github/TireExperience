import NextImage from "next/image";

type ImageFeatureComponentProps = {
  src: string;
  alt: string;
  index?: number;
  isActive?: boolean;
  onClick?: (index: number) => void;
  width?: number;
  height?: number;
};

const ImageFeatureComponent = ({
  src,
  alt,
  index,
  isActive,
  onClick,
  width = 64,
  height = 64,
}: ImageFeatureComponentProps) => {
  const handleClick = () => {
    if (onClick && index !== undefined) {
      onClick(index);
    }
  };

  return (
    <button
      className="relative m-2 inline-block cursor-pointer"
      onClick={handleClick}
      style={{ width, height }}
    >
      <span
        className={`absolute top-1/2 left-1/2 transform duration-500 ease-in-out -translate-x-1/2 -translate-y-1/2 ${
          isActive
            ? "animate-border scale-125 opacity-1"
            : "reset-border opacity-0"
        }`}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        <span
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            isActive ? "animate-border" : "reset-border"
          } border-yellow-custom-thick`}
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
        <span
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dashed-custom ${
            isActive
              ? "animate-border rotate-180 duration-1000 origin-center"
              : "reset-border"
          }`}
          style={{
            width: "calc(100% + 20px)",
            height: "calc(100% + 20px)",
            borderRadius: "50%",
            opacity: isActive ? 1 : 0,
          }}
        />
      </span>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-transform duration-500 ease-in-out ${
          isActive ? "transform scale-125" : "transform scale-100"
        } outline-none w-16 h-16 md:w-26 md:h-26`}
      />
    </button>
  );
};

export default ImageFeatureComponent;
