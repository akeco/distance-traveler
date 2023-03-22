import React from "react";
import clsx from "clsx";

type TextFieldProps = {
  label: string;
} & React.HTMLProps<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col max-w-[324px]">
        <label htmlFor="input-field">{label}</label>
        <input
          role="input-field"
          {...props}
          ref={ref}
          className={clsx(
            className,
            "border border-solid rounded-md px-[12px] py-[8px]"
          )}
          id="input-field"
          type="text"
        />
      </div>
    );
  }
);
