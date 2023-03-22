import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "@/components/text-field/text-field";

const label = "City of origin";
const value = "Mocked text";

describe("Testing TextField component", () => {
  test("Test component content and actions", () => {
    const fn = vi.fn();
    render(<TextField label={label} onChange={fn} />);

    const inputField = screen.getByRole("input-field");

    fireEvent.change(inputField, { target: { value } });
    expect(screen.getByText(label)).toBeDefined();
    expect(fn).toBeCalledTimes(1);
    expect(fn).not.toBeCalledTimes(2);
  });
});
