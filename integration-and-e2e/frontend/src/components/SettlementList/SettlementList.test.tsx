import { Settlement } from "../../type";
import { render } from "@testing-library/react";
import SettlementList from "./SettlementList";
describe("SettlementList", () => {
  it("スナップショットテスト", () => {
    const settlements: Settlement[] = [
      { from: "Alice", to: "Bob", amount: 1000 },
      { from: "Bob", to: "Alice", amount: 2000 },
    ];

    const { container } = render(<SettlementList settlements={settlements} />);
    expect(container).toMatchSnapshot();
  });
});
