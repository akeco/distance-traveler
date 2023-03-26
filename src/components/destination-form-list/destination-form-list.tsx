import { ReactComponent as PinIcon } from "@/assets/icons/pin.svg";
import clsx from "clsx";
import { DestinationsSearch } from "@/components/destinations-search/destinations-search";
import { CityType, DestinationType } from "@/types";

type DestinationFormListProps = {
  children?: any;
  destinations: DestinationType[];
  onRemoveDestination(id: string): void;
  onSelectDestination(id: string, value: CityType): void;
  onClear(id: string): void;
};

const originLabel = "City of origin";
const destinationLabel = "City of destination";

export const DestinationFormList = ({
  destinations,
  onRemoveDestination,
  onSelectDestination,
  onClear,
}: DestinationFormListProps) => {
  return (
    <div className="relative border-l-2 border-dotted border-gray-700 pl-10">
      {destinations.map((item, index) => (
        <div
          key={item.id}
          className={clsx("flex items-center", {
            ["white-space-top-content"]: !index,
            ["white-space-bottom-content"]: index === destinations.length - 1,
          })}
        >
          {index === destinations.length - 1 ? (
            <PinIcon className="absolute left-[-13px] mb-[-5px] bg-white w-[24px] h-[24px]" />
          ) : (
            <div className="absolute left-[-10px] mb-[-5px] border border-gray-700 bg-white rounded-full w-[18px] h-[18px]"></div>
          )}

          <DestinationsSearch
            destination={item}
            hasRemoveIcon={index !== 0 && destinations.length !== 2}
            label={!index ? originLabel : destinationLabel}
            onRemoveDestination={onRemoveDestination}
            onSelectDestination={onSelectDestination}
            onClear={onClear}
          />
        </div>
      ))}
    </div>
  );
};
