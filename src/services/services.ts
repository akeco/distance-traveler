import cities from "@/assets/cities.json";
import { CityType } from "@/types";

export const services = {
  getCities: (city: string): Promise<CityType[]> =>
    new Promise((res) =>
      setTimeout(
        () =>
          res(
            cities.filter((item: { name: string }) =>
              item.name.toLowerCase().includes(city.toLowerCase())
            )
          ),
        500
      )
    ),
};
