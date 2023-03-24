import { vi, describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchDropdown } from "@/components/shared/search-dropdown/search-dropdown";
import citiesJson from "@/assets/cities.json";

const label = "City of origin";
const value = "sa";
const id = "234fde";

describe("Testing SearchDropdown component", () => {
  test("Test SearchDropdown content and actions", async () => {
    const removeDestinationFn = vi.fn();
    const onSelectDestinationFn = vi.fn();
    const onChangeFn = vi.fn();
    const onClearFn = vi.fn();
    render(
      <SearchDropdown
        id={id}
        hasRemoveIcon={true}
        label={label}
        value={value}
        selectedDestination={{ ...citiesJson[0], id }}
        cities={citiesJson}
        isLoading={false}
        onChangeValue={onChangeFn}
        onRemoveDestination={removeDestinationFn}
        onSelectDestination={onSelectDestinationFn}
        onClear={onClearFn}
      />
    );

    const inputField: HTMLInputElement = screen.getByRole("combobox");
    const removeButton: HTMLButtonElement = screen.getByRole(
      "remove-destination-button"
    );

    expect(screen.getByText(label)).toBeDefined();
    expect(inputField).toBeDefined();
    expect(removeButton).toBeDefined();

    fireEvent.click(removeButton);
    expect(removeDestinationFn).toBeCalledTimes(1);

    fireEvent.change(inputField, { target: { value } });
    expect(inputField.value).toEqual(value);

    const options = screen.getAllByRole("option");
    expect(options).toBeDefined();
    fireEvent.click(options[0]);
    expect(onSelectDestinationFn).toBeCalledTimes(1);
  });
});
