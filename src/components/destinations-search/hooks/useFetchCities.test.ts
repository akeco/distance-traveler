import { describe, test, expect } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useFetchCities } from "@/components/destinations-search/hooks/useFetchCities";

test("Test useFetchCities hook", () => {
  describe("Testing hook functionality", () => {
    let value = "sa";
    const { result, rerender } = renderHook(() => useFetchCities(value));

    expect(result.current.cities.length).toBeDefined();
    expect(result.current.isLoading).toBeFalsy();

    value = "some-random-text-123";
    rerender();

    expect(result.current.cities.length).not.toBeDefined();

    value = "fail";
    rerender();

    expect(result.current.error).toBeDefined();
    expect(result.current.cities.length).toEqual(0);
  });
});
