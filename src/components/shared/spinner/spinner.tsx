import clsx from "clsx";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => (
  <div
    className={clsx(
      "border-2 border-gray-200 border-t-2 border-t-purple w-5 h-5 rounded-[50%] animate-spin",
      className
    )}
  ></div>
);
