import { Button } from "@/components/shared/button/button";
import clsx from "clsx";

type PassengersCounterProps = {
  value: number;
  className?: string;
  onIncrease(): void;
  onDecrease(): void;
};

export const PassengersCounter = ({
  value,
  className,
  onIncrease,
  onDecrease,
}: PassengersCounterProps) => {
  return (
    <div className={className}>
      <p>Passengers</p>
      <div
        className={clsx(
          "flex items-center justify-between border border-gray-200 rounded-md w-[100px]",
          {
            ["border-red"]: !value,
          }
        )}
      >
        <Button
          className={clsx("w-[23px] h-[23px] !p-0", {
            "border-red": !value,
          })}
          color="primary"
          variant="filled"
          disabled={!value}
          onClick={onDecrease}
        >
          -
        </Button>
        <span className="flex justify-center">{value}</span>
        <Button
          className="w-[23px] h-[23px] !p-0"
          color="primary"
          variant="filled"
          onClick={onIncrease}
        >
          +
        </Button>
      </div>
      {!value && <span className="text-red">Select passengers</span>}
    </div>
  );
};
