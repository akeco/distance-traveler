import { describe, expect, it, beforeEach } from "vitest";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { useGetDataFromQuery } from "@/hooks/useGetDataFromQuery";
import { DestinationType } from "@/types";

const destinations: DestinationType[] = [
  {
    id: "AZroseLlFw",
    name: "Paris",
    latitude: 48.856614,
    longitude: 2.352222,
  },
  {
    id: "xA407Rzb4d",
    name: "Nice",
    latitude: 43.710173,
    longitude: 7.261953,
  },
];

let searchQuery =
  "AZroseLlFw-name=Paris&AZroseLlFw-latitude=48.856614&AZroseLlFw-longitude=2.352222&xA407Rzb4d-name=Nice&xA407Rzb4d-latitude=43.710173&xA407Rzb4d-longitude=7.261953&passengers=2&date=1679904232000";
const errorSearchQuery =
  "AZroseLlFw-name=Dijon&AZroseLlFw-latitude=48.856614&AZroseLlFw-longitude=2.352222&xA407Rzb4d-name=Nice&xA407Rzb4d-latitude=43.710173&xA407Rzb4d-longitude=7.261953&passengers=2&date=1679904232000";

describe("useGetDataFromQuery", () => {
  let hookResults: RenderHookResult<
    [],
    {
      date: number;
      passengers: number;
      destinations: DestinationType[];
    }
  >;

  describe("with valid query string", () => {
    beforeEach(() => {
      hookResults = renderHook(() => useGetDataFromQuery(searchQuery));
    });

    it("returns valid date", () => {
      expect(hookResults.result.current.date).toBeDefined();
      expect(hookResults.result.current.date).toEqual(1679904232000);
    });

    it("returns valid number of passengers", () => {
      expect(hookResults.result.current.passengers).toBeDefined();
      expect(hookResults.result.current.passengers).toEqual(2);
    });

    it("returns valid destinations array", () => {
      expect(hookResults.result.current.destinations).toBeDefined();
      expect(hookResults.result.current.destinations).toEqual(destinations);
    });
  });

  describe("with invalid query string", () => {
    beforeEach(() => {
      hookResults = renderHook(() => useGetDataFromQuery(""));
    });

    it("returns NaN for date", () => {
      expect(hookResults.result.current.date).toBeDefined();
      expect(hookResults.result.current.date).toEqual(NaN);
    });

    it("returns NaN for number of passengers", () => {
      expect(hookResults.result.current.passengers).toBeDefined();
      expect(hookResults.result.current.passengers).toEqual(NaN);
    });

    it("returns empty array for destinations", () => {
      expect(hookResults.result.current.destinations).toBeDefined();
      expect(hookResults.result.current.destinations).toEqual([]);
    });
  });
});
