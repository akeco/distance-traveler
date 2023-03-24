import React from "react";
import clsx from "clsx";
import { ReactComponent as ClearIcon } from "@/assets/icons/close.svg";

type TextFieldProps = {
  label: string;
  errorMessage?: string;
  onClear?(): void;
} & React.HTMLProps<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ value, errorMessage, label, className, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="flex relative flex-col w-[324px]">
          <label htmlFor="input-field">{label}</label>
          <input
            role="input-field"
            {...props}
            ref={ref}
            className={clsx(
              className,
              "border border-gray-200 rounded-md px-[12px] py-[8px]",
              {
                "border-red": errorMessage,
              }
            )}
            id="input-field"
            type="text"
          />
          {value && onClear && (
            <ClearIcon
              className="absolute right-[10px] top-[33px] z-10 cursor-pointer"
              onClick={onClear}
            />
          )}
        </div>
        {errorMessage && <p className="absolute text-red">{errorMessage}</p>}
      </div>
    );
  }
);
