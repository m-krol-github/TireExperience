import { describe, it, expect, beforeEach } from "vitest";
import { useBearStore } from "./zustand-store";

describe("useBearStore", () => {
  beforeEach(() => {
    // Reset the store to the initial state before each test
    useBearStore.setState({ bears: 0 });
  });

  it("should start with 0 bears", () => {
    // Check initial state
    expect(useBearStore.getState().bears).toBe(0);
  });

  it("should increase the bear count by a specified number", () => {
    // Test increasing bears
    useBearStore.getState().increase(3);
    expect(useBearStore.getState().bears).toBe(3);

    // Test increasing bears again
    useBearStore.getState().increase(2);
    expect(useBearStore.getState().bears).toBe(5);
  });
});
