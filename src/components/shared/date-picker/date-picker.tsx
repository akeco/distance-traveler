import { Dispatch, SetStateAction, forwardRef } from "react";
import DatePickerComponent, {
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
} from "react-datepicker";
import dayjs from "dayjs";
import { ReactComponent as ArrowIcon } from "@/assets/icons/circle-arrow.svg";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?(): void }
>(({ value = "", onClick = () => {} }, ref) => (
  <button
    ref={ref}
    className="border border-gray-200 p-2 rounded-md tracking-wider"
    onClick={onClick}
  >
    {value}
  </button>
));

const DatePickerHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => (
  <div role="date-picker-header" className="flex px-4 justify-between">
    <button
      role="prev-month-button"
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
    >
      <ArrowIcon className="rotate-180" />
    </button>
    <span className="text-base font-semibold uppercase">
      {`${dayjs(date).format("MMM")} ${dayjs(date).format("YYYY")}`}
    </span>
    <button
      role="next-month-button"
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
    >
      <ArrowIcon />
    </button>
  </div>
);

type DatePickerProps = {
  startDate: Date;
  onChange: Dispatch<SetStateAction<Date>>;
} & ReactDatePickerProps;

export const DatePicker = ({ startDate, onChange }: DatePickerProps) => {
  return (
    <div>
      <p>Date</p>
      <DatePickerComponent
        selected={startDate}
        onChange={onChange}
        customInput={<CustomInput />}
        minDate={new Date(dayjs(new Date()).add(1, "day").format())}
        renderCustomHeader={DatePickerHeader}
      />
    </div>
  );
};
