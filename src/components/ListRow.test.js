import { render, cleanup, screen } from "@testing-library/react";
import ListRow from "./ListRow";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("should render ListRow", () => {
  render(<ListRow />);
  const listRowEle = screen.getByTestId("listRowLabel");
  expect(listRowEle).toBeInTheDocument();
  expect(listRowEle).toContainHTML("h4");
  expect(listRowEle).toContainHTML("span");
});

test("should render ListRow button", () => {
  render(<ListRow />);
  const listRowEleButton = screen.getByTestId("listRowButton");
  expect(listRowEleButton).toBeInTheDocument();
  expect(listRowEleButton).toContainHTML("button");
  expect(listRowEleButton).toContainHTML("i");
});

test("should match ListRow Snapshot", () => {
  const dummyList = { id: 1, name: "Abhi", favourite: false };
  const tree = renderer
    .create(<ListRow id={dummyList.id} name={dummyList.name} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
