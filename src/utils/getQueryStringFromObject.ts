import { DestinationType } from "@/types";

export const getQueryStringFromObject = (
  destinations: DestinationType[],
  fields: (keyof DestinationType)[]
) => {
  const destinationsList: Record<string, string | number | undefined>[] =
    destinations.map((item: DestinationType) => {
      let obj: Record<string, string | number> = {};

      fields.forEach((key) => {
        obj[`${item.id}-${key}`] = item[key] as string | number;
      });
      return obj;
    });

  const params = new URLSearchParams();
  destinationsList.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) params.append(key, obj[key] as string);
    });
  });
  return params.toString();
};
