import { describe, expect, it } from "vitest";
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

describe("Testing useGetDataFromQuery hook functionality", () => {
  let hookResults: RenderHookResult<
    [],
    {
      date: number;
      passengers: number;
      destinations: DestinationType[];
    }
  >;

  it("Test valid cases with existing query", () => {
    hookResults = renderHook(() => useGetDataFromQuery(searchQuery));
    const { result } = hookResults;
    expect(result.current.date).toBeDefined();
    expect(result.current.date).toEqual(1679904232000);
    expect(result.current.passengers).toBeDefined();
    expect(result.current.passengers).toEqual(2);
    expect(result.current.destinations).toBeDefined();
    expect(result.current.destinations).toEqual(destinations);
  });

  it("Test invalid cases with missing query", () => {
    searchQuery = "";
    hookResults = renderHook(() => useGetDataFromQuery(searchQuery));
    const { result } = hookResults;
    expect(result.current.date).toBeDefined();
    expect(result.current.date).toEqual(NaN);
    expect(result.current.passengers).toBeDefined();
    expect(result.current.passengers).toEqual(NaN);
    expect(result.current.destinations).toBeDefined();
    expect(result.current.destinations).toEqual([]);
  });

  it("Test valid cases with partial query", () => {
    searchQuery =
      "AZroseLlFw-name=Paris&xA407Rzb4d-latitude=43.710173&passengers=2&date=1679904232000";
    hookResults = renderHook(() => useGetDataFromQuery(searchQuery));
    const { result } = hookResults;

    expect(result.current.date).toBeDefined();
    expect(result.current.date).toEqual(1679904232000);
    expect(result.current.passengers).toBeDefined();
    expect(result.current.passengers).toEqual(2);
    expect(result.current.destinations).toBeDefined();
    expect(result.current.destinations).toHaveLength(2);

    const [destination1, destination2] = result.current.destinations;

    expect(destination1.id).toEqual("AZroseLlFw");
    expect(destination1.name).toEqual("Paris");
    expect(destination1.latitude).toBeUndefined();
    expect(destination1.longitude).toBeUndefined();

    expect(destination2.id).toEqual("xA407Rzb4d");
    expect(destination2.name).toBeUndefined();
    expect(destination2.latitude).toEqual(43.710173);
    expect(destination2.longitude).toBeUndefined();
  });
});
