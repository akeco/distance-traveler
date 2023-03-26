import { CityType, DestinationType } from "@/types";
import { useEffect, useState } from "react";

type DataType = {
  destinations: DestinationType[];
  passengers: number;
  date: number;
};

export const useGetDataFromQuery = (searchQuery: string): DataType => {
  const [parsedData, setParsedData] = useState<DataType>({
    destinations: [],
    passengers: 0,
    date: 0,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchQuery);
    const obj: Record<string, string | number> = {};

    for (const [key, value] of params.entries()) {
      obj[key] = value;
    }

    const { passengers, date, ...locationParams } = obj;
    const groupedObj: Record<string, Partial<CityType>> = Object.entries(
      locationParams
    ).reduce((acc: Record<string, Partial<CityType>>, [key, value]) => {
      const prefix: string = key.split("-")[0];
      const propName: keyof CityType = key.split("-")[1] as keyof CityType;

      if (!acc[prefix]) {
        acc[prefix] = {};
      }
      acc[prefix][propName] =
        propName === "latitude" || propName === "longitude"
          ? Number(value)
          : (value as any);
      return acc;
    }, {});

    const destinations: DestinationType[] = Object.keys(groupedObj).map(
      (id) => ({
        id,
        ...groupedObj[id],
      })
    );
    setParsedData({
      destinations,
      passengers: Number(passengers),
      date: Number(date),
    });
  }, []);

  return { ...parsedData };
};
