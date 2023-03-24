import React, {
  useState,
  Fragment,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { Combobox } from "@headlessui/react";
import { TextField } from "@/components/shared/text-field/text-field";
import { ReactComponent as RemoveIcon } from "@/assets/icons/circle-close.svg";
import { Button } from "@/components/shared/button/button";
import { Spinner } from "@/components/shared/spinner/spinner";
import { DestinationType, CityType } from "@/types";

type SearchDropdownProps = {
  id: string;
  value: string;
  label: string;
  selectedDestination: DestinationType | undefined;
  cities: CityType[];
  isLoading: boolean;
  hasRemoveIcon: boolean;
  onChangeValue: Dispatch<SetStateAction<string>>;
  onRemoveDestination?(id: string): void;
  onSelectDestination(id: string, value: Partial<CityType>): void;
  onClear(id: string): void;
};

const people = [
  "Durward Reynolds",
  "Kenton Towne",
  "Therese Wunsch",
  "Benedict Kessler",
  "Katelyn Rohan",
];

const errorMessage = "You must choose the city of origin";

export const SearchDropdown = ({
  id,
  value,
  selectedDestination,
  label,
  isLoading,
  cities,
  hasRemoveIcon,
  onChangeValue,
  onRemoveDestination,
  onSelectDestination,
  onClear,
}: SearchDropdownProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean | null>(null);

  useEffect(() => {
    if (isFocused === null) return;
    setIsValid(!isFocused ? !!selectedDestination : true);
  }, [selectedDestination, value, isFocused]);

  const onClearTextField = () => {
    onChangeValue("");
    onClear(id);
  };

  const onBlur = () => setIsFocused(false);

  const onFocus = () => setIsFocused(true);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChangeValue(e.target.value);

  return (
    <div className="relative flex m-2 mb-6">
      <div>
        <Combobox value={(selectedDestination?.name as string) || value}>
          <Combobox.Input
            as={TextField}
            label={label}
            className="z-10"
            value={value}
            errorMessage={!isValid ? errorMessage : ""}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onClear={onClearTextField}
          />
          {!!cities.length && (
            <Combobox.Options className="absolute carret max-h-[240px] overflow-scroll w-full z-20 bg-white shadow-md max-w-[324px] rounded-md border border-purple-light mt-2">
              {cities.map((city: CityType) => (
                <Combobox.Option
                  key={`${city.name}-${city.latitude}`}
                  value={city}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`px-3 py-2 rounded-md m-1 cursor-pointer ${
                        active || selected
                          ? "bg-purple-light"
                          : "bg-white text-black"
                      }`}
                      onClick={() => {
                        onSelectDestination(id, city);
                      }}
                    >
                      {city.name}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
      {hasRemoveIcon && onRemoveDestination && (
        <Button
          role="remove-destination-button"
          className="absolute top-0 right-[-50px] top-[18px] cursor-pointer"
          onClick={() => onRemoveDestination(id)}
        >
          <RemoveIcon />
        </Button>
      )}
      {isLoading && <Spinner className="absolute z-10 top-[31px] right-10" />}
    </div>
  );
};
