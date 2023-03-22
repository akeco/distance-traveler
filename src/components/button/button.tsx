import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "ghost" | "filled";
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "ghost",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx("m-2 px-3 py-2 rounded-md text-purple", {
        "border border-gray-200 bg-gray-700 text-white": variant === "filled",
        "border border-gray-200 bg-gray-200 text-white": !!props.disabled,
      })}
    >
      {children}
    </button>
  );
};
