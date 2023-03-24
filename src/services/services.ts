import cities from "@/assets/cities.json";
import { CityType } from "@/types";

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
};
