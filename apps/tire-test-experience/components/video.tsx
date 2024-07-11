import { forwardRef } from "react";

/* eslint-disable jsx-a11y/media-has-caption */
const Video = forwardRef<HTMLVideoElement, { src: string; safariSrc: string }>(
  ({ src, safariSrc }, ref) => {
    return (
      <div className="md:relative w-full top-0">
        <video
          ref={ref}
          className="md:absolute top-0 left-0 w-full md:h-full rounded-lg overflow-visible border border-yellow-custom md:border-none object-cover"
          muted
          playsInline
        >
          <source src={safariSrc} type='video/mp4; codecs="hvc1"' />
          <source src={src} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
);

Video.displayName = "Video";

export default Video;
