import { render, screen } from "@testing-library/react";
import React from "react";

import "@testing-library/jest-dom";
import FeatureComponent from "./text-feature";

const setup = (overrides = {}) => {
  const props = {
    feature: { title: "Feature Title", description: "Feature Description" },
    arrowIcon: "arrow-icon.png",
    arrowAlt: "Arrow Icon Alt",
    ...overrides,
  };
  const utils = render(<FeatureComponent {...props} />);

  return { ...utils, props };
};

describe("FeatureComponent", () => {
  it("should render correctly", () => {
    setup();
    expect(screen.getByText("Feature Title")).toBeInTheDocument();
    expect(screen.getByText("Feature Description")).toBeInTheDocument();
    expect(screen.getByAltText("Arrow Icon Alt")).toBeInTheDocument();
  });
});
