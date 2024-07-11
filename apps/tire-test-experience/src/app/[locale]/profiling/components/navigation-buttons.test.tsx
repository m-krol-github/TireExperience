import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";
import { vi } from "vitest";

import NavigationButtons from "./navigation-buttons";
import "@testing-library/jest-dom";

const generateMockProps = () => ({
  currentStep: faker.number.int({ min: 1, max: 2 }),
  handlePrevStep: vi.fn(),
  handleNextStep: vi.fn(),
  nextButtonText: "Next",
  currentSelections: [],
  skipText: "Skip",
  progress: 50,
  goBackIcon: "../../../../../public/images/profiling/Arrow.svg",
});

const setup = (props = {}) => {
  const mockProps = {
    ...generateMockProps(),
    ...props,
  };
  const utils = render(<NavigationButtons {...mockProps} />);

  return {
    ...utils,
    mockProps,
  };
};

describe("NavigationButtons", () => {
  it("should render correctly", () => {
    const { getAllByText } = setup();
    expect(getAllByText("Skip")).toHaveLength(2); // Adjust for multiple elements
    expect(getAllByText("Next")).toHaveLength(1);
  });

  it("should render go back button when currentStep > 1", () => {
    const { getByAltText } = setup({ currentStep: 2 });
    expect(getByAltText("Go Back Icon")).toBeInTheDocument();
  });

  it("go back button is not rendered when currentStep <= 1", () => {
    const { queryByAltText } = setup({ currentStep: 1 });
    expect(queryByAltText("Go Back Icon")).toBeNull();
  });
});
