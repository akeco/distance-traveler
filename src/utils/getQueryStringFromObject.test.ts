import { describe, test, expect } from "vitest";
import { getQueryStringFromObject } from "@/utils/getQueryStringFromObject";
import { DestinationType } from "@/types";

const destinations: DestinationType[] = [
  {
    id: "BiUveSRMAo",
    name: "Atlanta",
    latitude: 33.749,
    longitude: -84.388,
  },
  {
    id: "GvOSbLhARe",
    name: "San Diego",
    latitude: 32.7157,
    longitude: -117.1611,
  },
];
const resultMockQueryString =
  "BiUveSRMAo-name=Atlanta&BiUveSRMAo-latitude=33.749&BiUveSRMAo-longitude=-84.388&GvOSbLhARe-name=San+Diego&GvOSbLhARe-latitude=32.7157&GvOSbLhARe-longitude=-117.1611";

describe("Testing getQueryStringFromObject functioon", () => {
  test("Test getQueryStringFromObject functioon results", () => {
    let result: string = getQueryStringFromObject(destinations, [
      "name",
      "latitude",
      "longitude",
    ]);
    expect(result).toBeDefined();
    expect(result).toEqual(resultMockQueryString);
    expect(result).not.toEqual(`${resultMockQueryString}1234`);

    result = getQueryStringFromObject(destinations.slice(0, 1), [
      "name",
      "latitude",
      "longitude",
    ]);
    expect(result).not.toEqual(resultMockQueryString);
  });
});
