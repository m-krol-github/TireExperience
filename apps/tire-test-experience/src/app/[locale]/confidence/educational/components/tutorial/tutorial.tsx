import Slider from "./video-slider";
import { Heading } from "../../../../../../../components/shared-text";
import { EduTutorialProps } from "../../types/types";

const EduTutorial = ({
  title,
  subtitle,
  videos,
  playIcon,
  arrowIcon,
  closeIcon,
}: EduTutorialProps) => {
  return (
    <div className=" relative bg-blue-background pl-4 md:pl-36">
      <div className=" ml-auto py-8">
        <div className="headings mb-14">
          <Heading level="h5" size="h5" data-testid="tutorial-subtitle">
            {subtitle}
          </Heading>
          <Heading
            level="h3"
            size="h3"
            data-testid="tutorial-title"
            className="whitespace-pre-line"
          >
            {title}
          </Heading>
        </div>
        <Slider
          videos={videos}
          playIcon={playIcon}
          arrowIcon={arrowIcon}
          closeIcon={closeIcon}
        />
      </div>
    </div>
  );
};

export default EduTutorial;
