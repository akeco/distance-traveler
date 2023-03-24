import { vi, describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DestinationsSearch } from "@/components/destinations-search/destinations-search";

const label = "City of origin";

describe("Testing DestinationsSearch component", () => {
  test("Test DestinationsSearch component content and actions", () => {
    const destination = {
      id: "oWN2548Qnv",
      latitude: 37.7749,
      longitude: -122.4194,
      name: "San Francisco",
    };
    const onRemoveDestinationFn = vi.fn();
    const onSelectDestinationFn = vi.fn();
    const onClearRn = vi.fn();

    render(
      <DestinationsSearch
        destination={destination}
        hasRemoveIcon={false}
        label={label}
        onRemoveDestination={onRemoveDestinationFn}
        onSelectDestination={onSelectDestinationFn}
        onClear={onClearRn}
      />
    );

    expect(screen.getByText(label)).toBeDefined();

    const input: HTMLInputElement = screen.getByRole("combobox");
    expect(input).toBeDefined();
    expect(input.value).toEqual(destination.name);
  });
});
