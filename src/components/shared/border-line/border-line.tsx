import clsx from "clsx";

type BorderLine = {
  className?: string;
  dots?: number;
};

export const BorderLine = ({ className, dots = 3 }: BorderLine) => {
  return (
    <div className={clsx("flex flex-col justify-between", className)}>
      {[...new Array(dots)].map((_, index) => (
        <div key={index} className="w-[2px] h-[2px] bg-black rounded-lg"></div>
      ))}
    </div>
  );
};
