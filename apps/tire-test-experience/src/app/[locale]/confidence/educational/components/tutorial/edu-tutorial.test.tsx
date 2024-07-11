import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import EduTutorial from "./tutorial";
import { EduTutorialProps } from "../../types/types";

const generateMockProps = (): EduTutorialProps => ({
  title: faker.lorem.words(3),
  subtitle: faker.lorem.sentence(),
  videos: [
    {
      id: faker.datatype.uuid(),
      src: "/apps/tire-test-experience/public/images/tire_banner.png",
      customText: faker.lorem.words(2),
      placeholderImgAlt: "Video Placeholder Alt",
      placeholderImgSrc:
        "/apps/tire-test-experience/public/images/tire_banner.png",
    },
  ],
  playIcon: "/apps/tire-test-experience/public/images/tire_banner.png",
  arrowIcon: "/apps/tire-test-experience/public/images/tire_banner.png",
  closeIcon: "/apps/tire-test-experience/public/images/tire_banner.png",
});

const setup = (props?: Partial<EduTutorialProps>) => {
  const mockProps = {
    ...generateMockProps(),
    ...props,
  };
  const utils = render(<EduTutorial {...mockProps} />);

  return {
    ...utils,
    mockProps,
  };
};

describe("EduTutorial", () => {
  it("should render correctly", () => {
    const { getByTestId, mockProps } = setup();

    expect(getByTestId("tutorial-subtitle")).toHaveTextContent(
      mockProps.subtitle
    );
    expect(getByTestId("tutorial-title")).toHaveTextContent(mockProps.title);
  });

  it("should render the Slider component with videos", () => {
    const { getByAltText, mockProps } = setup();

    mockProps.videos.forEach(() => {
      expect(getByAltText("Video Placeholder Alt")).toBeInTheDocument();
    });
  });
});
