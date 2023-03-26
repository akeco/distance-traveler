import cities from "@/assets/cities.json";
import { CityType, DestinationType } from "@/types";
import { getDistance } from "@/utils/getDistance";

const ERROR_CITY_NAME = "Dijon";

export const services = {
  getCities: (searchValue: string): Promise<CityType[]> =>
    new Promise((res, reject) =>
      setTimeout(() => {
        if (searchValue === "fail") {
          return reject("Cities with 'fail' name does not exist");
        }
        res(
          cities.filter((item: { name: string }) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }, 500)
    ),
  getDistance: (
    destinations: DestinationType[]
  ): Promise<{ distances: number[]; totalDistance: number }> =>
    new Promise((res, reject) =>
      setTimeout(() => {
        const hasError: boolean = !!destinations.filter(
          (item) => item.name === ERROR_CITY_NAME
        ).length;

        if (hasError) {
          return reject(
            `Distance calculation error with city ${ERROR_CITY_NAME}`
          );
        }

        const distances: number[] = destinations
          .map((item, index) => {
            if (!destinations[index + 1]) return 0;
            return getDistance(
              item.latitude!,
              item.longitude!,
              destinations[index + 1].latitude!,
              destinations[index + 1].longitude!
            );
          })
          .filter(Boolean);
        const totalDistance: number =
          Math.round(
            distances.reduce((total, distance) => total + distance, 0) * 100
          ) / 100;

        res({ distances, totalDistance });
      }, 500)
    ),
};
