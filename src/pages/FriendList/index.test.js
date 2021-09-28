import { render, cleanup, screen } from "@testing-library/react";
import FriendList from "../FriendList/index";
import ListRow from "../../components/ListRow";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

test("should render ListRow", () => {
  render(<FriendList />);
  const titleTestEle = screen.getByTestId("titleTest");
  expect(titleTestEle).toBeInTheDocument();
  expect(titleTestEle).toContainHTML("h3");
  expect(titleTestEle).toHaveTextContent("Friends List");
});

test("should render ListRow", () => {
  render(<FriendList />);
  const inputFieldTestEle = screen.getByTestId("inputfieldTest");
  expect(inputFieldTestEle).toBeInTheDocument();
  expect(inputFieldTestEle).toContainHTML("input");
  expect(inputFieldTestEle).toContainHTML("button");
  expect(inputFieldTestEle).toHaveTextContent("Click to Search");
});

test("should match ListRow Snapshot", () => {
  const dummyList = { id: 1, name: "Jeet", favourite: false };
  const tree = renderer
    .create(<ListRow id={dummyList.id} name={dummyList.name} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
