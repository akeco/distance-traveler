import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PassengersCounter } from "@/components/passengers-counter/passengers-counter";

const initialValue = 5;

describe("Testing PassengersCounter component", () => {
  test("Test PassengersCounter component content and actions", () => {
    const onAdd = vi.fn();
    const onRemove = vi.fn();
    render(
      <PassengersCounter
        value={initialValue}
        onIncrease={onAdd}
        onDecrease={onRemove}
      />
    );

    const decreaseButton = screen.getByText("-");
    const increaseButton = screen.getByText("+");

    fireEvent.click(decreaseButton);
    fireEvent.click(increaseButton);
    expect(screen.getByText(initialValue)).toBeDefined();
    expect(onAdd).toBeCalledTimes(1);
    expect(onRemove).toBeCalledTimes(1);
  });
});
