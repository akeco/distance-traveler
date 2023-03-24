import { useEffect, useState } from "react";
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

export const DestinationsSearch = ({
  destination,
  label,
  hasRemoveIcon,
  onRemoveDestination,
  onSelectDestination,
  onClear,
}: DestinationsSearchProps) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 250);

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
      isLoading={isLoading}
      hasRemoveIcon={hasRemoveIcon}
      label={label}
      onChangeValue={setValue}
      onRemoveDestination={onRemoveDestination}
      onSelectDestination={onSelectDestination}
      onClear={onClear}
    />
  );
};
