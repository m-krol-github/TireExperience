import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { createRef } from "react";

import "@testing-library/jest-dom";
import Slide from "./slide";
import { SlideProps } from "../../types/types";

const generateMockProps = (): SlideProps => ({
  videoSrc: "/apps/tire-test-experience/public/images/tire_banner.png",
  videoSafariSrc: "/apps/tire-test-experience/public/images/tire_banner.png",
  subtitle: faker.lorem.sentence(),
  title: faker.lorem.words(3),
  mainText: faker.lorem.paragraph(),
  subText: faker.lorem.sentence(),
  featureImages: [
    {
      src: "/apps/tire-test-experience/public/images/tire_banner.png",
      alt: "Feature Image 1",
    },
    {
      src: "/apps/tire-test-experience/public/images/tire_banner.png",
      alt: "Feature Image 2",
    },
  ],
  features: [
    { title: faker.lorem.words(2), description: faker.lorem.sentence() },
    { title: faker.lorem.words(2), description: faker.lorem.sentence() },
  ],
  textRef: createRef<HTMLDivElement>(),
  videoRef: createRef<HTMLVideoElement>(),
  featuresArrowIcon: faker.image.url(),
  slideIndex: 0,
  featuresArrowIconAlt: "Arrow Icon Alt",
});

const setup = (props?: SlideProps) => {
  const mockProps = {
    ...props,
    ...generateMockProps(),
  };
  const utils = render(<Slide {...mockProps} />);

  return {
    ...utils,
    mockProps,
  };
};

describe("Slide", () => {
  it("should render correctly", () => {
    const { getByTestId, getByText, getByAltText, mockProps } = setup();

    expect(getByTestId("subtitle")).toBeInTheDocument();
    expect(getByTestId("title")).toBeInTheDocument();
    expect(getByText(mockProps.mainText)).toBeInTheDocument();
    expect(getByText(mockProps.subText)).toBeInTheDocument();
    expect(getByAltText("Feature Image 1")).toBeInTheDocument();
    expect(getByAltText("Feature Image 2")).toBeInTheDocument();
  });

  it("should handle feature click and change feature text", async () => {
    const { getByTestId, getByAltText } = setup();

    const feature0Text = getByTestId("featureText-0");
    const feature1Text = getByTestId("featureText-1");

    expect(feature0Text).not.toHaveClass("opacity-0");
    expect(feature1Text).toHaveClass("opacity-0");

    await userEvent.click(getByAltText("Feature Image 2"));
    expect(feature0Text).toHaveClass("opacity-0");
    expect(feature1Text).not.toHaveClass("opacity-0");

    await userEvent.click(getByAltText("Feature Image 1"));
    expect(feature0Text).not.toHaveClass("opacity-0");
    expect(feature1Text).toHaveClass("opacity-0");
  });
});
