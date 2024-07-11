import { faker } from "@faker-js/faker";
import { render, fireEvent } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import VideoSection from "./video-section";

const generateMockProps = () => ({
  id: faker.datatype.uuid(),
  src: faker.image.imageUrl(),
  customText: faker.lorem.words(2),
  placeholderImgAlt: "Video Placeholder Alt",
  playIcon: faker.image.imageUrl(),
  closeIcon: faker.image.imageUrl(),
});

const setup = (props = {}) => {
  const mockProps = {
    ...generateMockProps(),
    ...props,
  };
  const utils = render(<VideoSection {...mockProps} />);

  return {
    ...utils,
    mockProps,
  };
};

describe("VideoSection", () => {
  it("should render correctly", () => {
    const { mockProps, getByText, getByAltText } = setup();

    expect(getByText(mockProps.customText)).toBeInTheDocument();
    expect(getByAltText("Video Placeholder Alt")).toBeInTheDocument();
  });

  it("should open video modal on play button click", () => {
    const { getByRole, getByAltText, getByTestId } = setup();

    const playButton = getByAltText("Video Placeholder Alt");
    fireEvent.click(playButton);

    const videoElement = getByTestId("video-element");
    expect(videoElement).toBeInTheDocument();

    const closeButton = getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });
});
