import { describe, test, expect } from "vitest";
import { getRandomId } from "@/utils/getRandomId";

describe("Testing getRandomId functioon", () => {
  test("Test getRandomId functioon results", () => {
    expect(getRandomId()).toBeDefined();
    expect(getRandomId().length).toEqual(10);
    expect(getRandomId(5).length).toEqual(5);
  });
});
