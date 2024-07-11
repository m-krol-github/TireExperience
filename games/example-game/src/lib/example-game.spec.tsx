import { render } from "@testing-library/react";

import ExampleGame from "./example-game";

describe("ExampleGame", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ExampleGame />);
    expect(baseElement).toBeTruthy();
  });
});
