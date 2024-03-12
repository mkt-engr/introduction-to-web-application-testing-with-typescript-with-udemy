import { render, screen, waitFor } from "@testing-library/react";
import AsyncComponent from "./AsyncComponent";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
describe("Async Component", () => {
  it("ボタンをクリックすると非同期処理が実行されること", async () => {
    //コンポーネントのレンダリング
    render(<AsyncComponent />);
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    //ボタンクリック
    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    //非同期処理完了まで待機
    await waitFor(
      () => {
        expect(screen.getByText("Updated text")).toBeInTheDocument();
      },
      {
        interval: 50,
        timeout: 3000,
      }
    );
  });
});
