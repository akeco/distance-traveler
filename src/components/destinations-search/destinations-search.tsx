import { useEffect, useState, useRef } from "react";
import { SearchDropdown } from "../shared/search-dropdown/search-dropdown";
import { useDebounce } from "@/hooks/useDebounce";
import { CityType, DestinationType } from "@/types";
import { useFetchCities } from "./hooks/useFetchCities";
import toast from "react-hot-toast";

type DestinationsSearchProps = {
  destination: DestinationType;
  hasRemoveIcon: boolean;
  label: string;
  onRemoveDestination(id: string): void;
  onSelectDestination(id: string, value: Partial<CityType>): void;
  onClear(id: string): void;
};

const TIMEOUT = 1000;
const DEBOUNCE_TIMEOUT = 250;

export const DestinationsSearch = ({
  destination,
  label,
  hasRemoveIcon,
  onRemoveDestination,
  onSelectDestination,
  onClear,
}: DestinationsSearchProps) => {
  const [value, setValue] = useState<string>("");
  const [disableLoader, setDisableLoader] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, DEBOUNCE_TIMEOUT);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (destination.name) {
      setDisableLoader(true);
      setValue(destination.name);

      timerRef.current = setTimeout(() => {
        setDisableLoader(false);
      }, TIMEOUT);
    }
  }, [destination]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const { cities, isLoading, error } = useFetchCities(debouncedValue);

  useEffect(() => {
    if (error) {
      toast.error(error.toString());
    }
  }, [error]);

  return (
    <SearchDropdown
      id={destination.id}
      value={value}
      selectedDestination={destination}
      cities={cities}
      isLoading={disableLoader ? false : isLoading}
      hasRemoveIcon={hasRemoveIcon}
      label={label}
      onChangeValue={setValue}
      onRemoveDestination={onRemoveDestination}
      onSelectDestination={onSelectDestination}
      onClear={onClear}
    />
  );
};
