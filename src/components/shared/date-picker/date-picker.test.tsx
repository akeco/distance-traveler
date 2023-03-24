import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DatePicker } from "@/components/shared/date-picker/date-picker";
import dayjs from "dayjs";

describe("Testing DatePicker component", () => {
  test("Test DatePicker content and actions", () => {
    const onChange = vi.fn();
    const startDate = new Date();
    render(<DatePicker startDate={startDate} onChange={onChange} />);

    const dateInput = screen.getByText(dayjs(startDate).format("MM/DD/YYYY"));

    expect(screen.getByText("Date")).toBeDefined();
    expect(dateInput).toBeDefined();

    fireEvent.click(dateInput);
    expect(screen.getByRole("date-picker-header")).toBeDefined();

    const prevMonthButton = screen.getByRole("prev-month-button");
    expect(prevMonthButton).toBeDefined();

    expect(screen.findByText(dayjs(startDate).format("MMM"))).toBeDefined();
    fireEvent.click(prevMonthButton);
    expect(
      screen.findAllByText(dayjs(startDate).subtract(1, "month").format("MMM"))
    ).toBeDefined();

    const nextMonthButton = screen.getByRole("next-month-button");
    expect(nextMonthButton).toBeDefined();

    fireEvent.click(nextMonthButton);
    expect(
      screen.findAllByText(dayjs(startDate).add(1, "month").format("MMM"))
    ).toBeDefined();
  });
});
