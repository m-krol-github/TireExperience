import { useState } from "react";

interface VideoSectionProps {
  id: string;
  src: string;
  customText: string;
  placeholderImgAlt?: string;
  placeholderImgSrc?: string;
  playIcon: string;
  closeIcon: string;
}

/* eslint-disable jsx-a11y/media-has-caption */
const VideoSection: React.FC<VideoSectionProps> = ({
  src,
  customText,
  playIcon,
  placeholderImgAlt,
  placeholderImgSrc,
  closeIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden">
      <h5 className="absolute border border-white top-0 right-0 font-michelin bg-black/20 text-white px-5 py-3 text-xs rounded-bl-2xl rounded-tr-3xl border-r-0 border-t-0">
        {customText}
      </h5>
      <div className="h-full w-full flex items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={placeholderImgSrc}
            alt={placeholderImgAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute  flex  justify-center items-center border border-white bottom-0 left-0 font-michelin w-14 h-10 bg-black/20 text-white  text-xs rounded-bl-3xl rounded-tr-2xl border-l-0 border-b-0">
            <img src={playIcon} alt="Play" className="relative w-3 h-3" />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2  bg-opacity-50 rounded-full"
              aria-label="close"
            >
              <img src={closeIcon} alt="Close" className="w-10 h-10" />
            </button>
            <video
              data-testid="video-element"
              src={src}
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
