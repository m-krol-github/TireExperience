import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import "@testing-library/jest-dom";
import Slider from "./slider";
import { EduSlider, EduSliderProps } from "../../types/types";

const generateMockSlide = (): EduSlider => ({
  title: faker.lorem.words(3),
  subtitle: faker.lorem.sentence(),
  videoSrc: "/apps/tire-test-experience/public/images/tire_banner.png",
  videoSafariSrc: "/apps/tire-test-experience/public/images/tire_banner.png",
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
  mainText: faker.lorem.paragraph(),
  subText: faker.lorem.sentence(),
  readMore: faker.lorem.paragraph(),
  features: [
    { title: faker.lorem.words(2), description: faker.lorem.sentence() },
    { title: faker.lorem.words(2), description: faker.lorem.sentence() },
  ],
  featuresArrowIcon: faker.image.url(),
  featuresArrowIconAlt: "Arrow Icon Alt",
  slideIndex: 1,
});

const generateMockProps = (): EduSliderProps => ({
  slides: [generateMockSlide(), generateMockSlide(), generateMockSlide()],
});

const setup = (props?: Partial<EduSliderProps>) => {
  const mockProps = {
    ...generateMockProps(),
    ...props,
  };
  const utils = render(<Slider {...mockProps} />);

  return {
    ...utils,
    mockProps,
  };
};

describe("Slider", () => {
  it("should render all slides correctly", () => {
    const { getAllByText, getAllByAltText, mockProps } = setup();

    mockProps.slides.forEach((slide) => {
      const subtitleElement = getAllByText(slide.subtitle);
      expect(subtitleElement).not.toHaveLength(0);

      const titleElement = getAllByText(slide.title);
      expect(titleElement).not.toHaveLength(0);

      slide.featureImages?.forEach((image) => {
        const imageElement = getAllByAltText(image.alt!);
        expect(imageElement).not.toHaveLength(0);
      });
    });
  });

  it("should render 'Read More' button and expand text on click", () => {
    const { getAllByText, getByText, mockProps } = setup();

    const readMoreButtons = getAllByText("Read More");
    expect(readMoreButtons).toHaveLength(mockProps.slides.length);

    const firstReadMoreButton = readMoreButtons[0];
    userEvent.click(firstReadMoreButton);

    const expandedText = getByText(mockProps.slides[0].readMore!);
    expect(expandedText).toBeInTheDocument();
  });
});
