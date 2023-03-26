import { useEffect, useState } from "react";
import { DestinationType } from "@/types";
import { services } from "@/services/services";

export const useGetDistance = (
  destinations: DestinationType[]
): {
  distances: number[];
  totalDistance: number;
  error: string | undefined;
  isLoading: boolean;
} => {
  const [result, setResult] = useState<{
    distances: number[];
    totalDistance: number;
  }>({ distances: [], totalDistance: 0 });
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const result = await services.getDistance(destinations);
        setResult(result);
      } catch (err: unknown) {
        setError(err as string);
      }
      setIsLoading(false);
    })();
  }, [destinations]);

  return { ...result, error, isLoading };
};
