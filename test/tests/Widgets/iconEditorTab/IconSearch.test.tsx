import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { IconSearch } from "../../../../src/Widgets/FormRatingWidget/IconEditorTab/IconSearch";
import renderer from "react-test-renderer";

const setSearchValue = jest.fn();
describe("IconSearch", () => {
  it("renders search input and label", () => {
    const searchValue = "";

    const { getByLabelText, getByPlaceholderText } = render(
      <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
    );

    const searchInput = getByPlaceholderText("Search icons");
    const searchLabel = getByLabelText("Search icons");

    expect(searchInput).toBeInTheDocument();
    expect(searchLabel).toBeInTheDocument();
  });

  it("calls setSearchValue when input changes", () => {
    const searchValue = "";

    const { getByPlaceholderText } = render(
      <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
    );

    const searchInput = getByPlaceholderText("Search icons");
    fireEvent.change(searchInput, { target: { value: "moon" } });

    expect(setSearchValue).toHaveBeenCalledWith("moon");
  });

  it("renders ClearSearchButton when searchValue is not empty", () => {
    const searchValue = "moon";

    const { getByText } = render(
      <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
    );

    const clearSearchButton = getByText("Clear search");
    expect(clearSearchButton).toBeInTheDocument();
  });

  it("does not render ClearSearchButton when searchValue is empty", () => {
    const searchValue = "";

    const { queryByText } = render(
      <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
    );

    const clearSearchButton = queryByText("Clear search");
    expect(clearSearchButton).toBeNull();
  });

  it("calls setSearchValue with empty string when ClearSearchButton is clicked", () => {
    const searchValue = "moon";

    const { getByText } = render(
      <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
    );

    const clearSearchButton = getByText("Clear search");
    fireEvent.click(clearSearchButton);

    expect(setSearchValue).toHaveBeenCalledWith("");
  });

  it("renders correctly", () => {
    const searchValue = "moon";

    const tree = renderer
      .create(
        <IconSearch setSearchValue={setSearchValue} searchValue={searchValue} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
