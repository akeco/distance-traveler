import clsx from "clsx";

type DistanceLabelProps = {
  className?: string;
  children: string;
};

export const DistanceLabel = ({ className, children }: DistanceLabelProps) => {
  return (
    <div
      className={clsx(
        "relative border border-purple text-purple rounded-md px-2 whitespace-nowrap",
        className
      )}
    >
      {children}
      <div className="absolute right-[-5px] top-[5px]">
        <div className="relative triangle before:right-[1px] before:top-[-4px]"></div>
      </div>
    </div>
  );
};
