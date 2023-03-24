import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "ghost" | "filled";
  color?: "default" | "primary" | "dark";
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  color = "default",
  variant = "ghost",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx("m-2 px-3 py-2 rounded-md", className, {
        "text-purple": variant === "ghost",
        "bg-purple-light border-gray-200 hover:bg-purple text-white":
          color === "primary" && variant !== "ghost",
        "bg-purple-dark border border-gray-200 hover:bg-purple text-white":
          color === "dark" && variant !== "ghost",
        "!bg-gray-200 border-gray-200 text-white": !!props.disabled,
      })}
    >
      {children}
    </button>
  );
};
