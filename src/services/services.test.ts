import { describe, test, expect } from "vitest";
import { services } from "@/services/services";

describe("Testing services", () => {
  test("Testing services functionality", async () => {
    const search = "sa";
    const nonExistingSearch = "random-string";

    let result = await services.getCities(search);
    expect(result.length).toBeDefined();

    result = await services.getCities(nonExistingSearch);
    expect(result.length).toEqual(0);
  });
});
