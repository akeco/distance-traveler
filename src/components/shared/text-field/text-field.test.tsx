import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "@/components/shared/text-field/text-field";

const label = "City of origin";
const value = "Mocked text";

describe("Testing TextField component", () => {
  test("Test component content and actions", () => {
    const onChangeFn = vi.fn();
    render(<TextField label={label} onChange={onChangeFn} />);

    const inputField: HTMLInputElement = screen.getByRole("input-field");

    fireEvent.change(inputField, { target: { value } });
    expect(inputField.value).toEqual(value);
    expect(screen.getByText(label)).toBeDefined();
    expect(onChangeFn).toBeCalledTimes(1);
  });
});
