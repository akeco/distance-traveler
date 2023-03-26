import { DestinationType } from "@/types";
import { ReactComponent as PinIcon } from "@/assets/icons/pin.svg";
import clsx from "clsx";
import { DistanceLabel } from "../shared/distance-label/distance-label";

type DestinationResultListProps = {
  distances: number[];
  destinations: DestinationType[];
};

export const DestinationResultList = ({
  distances,
  destinations,
}: DestinationResultListProps) => {
  return (
    <div className="relative">
      {destinations.map((item, index) => (
        <div
          key={item.id}
          className={clsx("flex grid grid-cols-3 h-[40px]", {})}
        >
          {index !== destinations.length - 1 && distances[index] ? (
            <DistanceLabel className="mt-5 -mr-5">{`${distances[index]} km`}</DistanceLabel>
          ) : (
            <div></div>
          )}

          <div className="relative flex justify-center">
            {index === destinations.length - 1 ? (
              <PinIcon className="bg-white w-[24px] h-[24px] z-10" />
            ) : (
              <div className="border border-gray-700 bg-white rounded-full w-[18px] h-[18px] z-10"></div>
            )}
            {index !== destinations.length - 1 && (
              <div className="h-full absolute left-[49.5%] border-l border-black border-dotted z-0 w-1"></div>
            )}
          </div>

          <div className="-ml-2">{item.name}</div>
        </div>
      ))}
    </div>
  );
};
