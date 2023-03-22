import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/button/button";

const label = "Add destination";

describe("Testing Button component", () => {
  test("Test Button component content and actions", () => {
    const fn = vi.fn();
    render(<Button onClick={fn}>{label}</Button>);

    const buttonElement = screen.getByText(label);

    expect(buttonElement).toBeDefined();
    fireEvent.click(buttonElement);
    expect(fn).toBeCalledTimes(1);
    expect(fn).not.toBeCalledTimes(2);
  });
});
