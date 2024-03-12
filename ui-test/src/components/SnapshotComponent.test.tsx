import { render } from "@testing-library/react";
import SnapshotComponent from "./SnapshotComponent";

it("Snapshotのテスト", () => {
  const { container } = render(<SnapshotComponent text="Hello World?" />);
  expect(container).toMatchSnapshot();
});
