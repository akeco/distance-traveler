import { CityType } from "@/types";
import { useEffect, useState } from "react";
import { services } from "@/services/services";

export const useFetchCities = (
  value: string
): { cities: CityType[]; isLoading: boolean; error: string | undefined } => {
  const [cities, setCities] = useState<CityType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      if (value) {
        setError(undefined);
        setIsLoading(true);
        try {
          const result: CityType[] = await services.getCities(value);
          setCities(result);
        } catch (err: unknown) {
          setError(err as string);
          setCities([]);
        }
        setIsLoading(false);
      } else {
        setCities([]);
      }
    })();
  }, [value]);

  return { cities, isLoading, error };
};
