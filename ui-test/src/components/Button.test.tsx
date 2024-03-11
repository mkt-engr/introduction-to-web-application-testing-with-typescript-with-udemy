import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Buttonコンポーネント", () => {
  it("buttonタグがレンダリングされること", () => {
    // テスト対象のコンポーネントをレンダリング
    render(
      <Button
        label="ボタン"
        onClick={() => {
          alert("click");
        }}
      />
    );

    const element = screen.getByRole("button", { name: "ボタン" });
    expect(element).toBeInTheDocument(); //拡張マッチャー
    expect(element).toHaveTextContent("ボタン"); //拡張マッチャー
  });
});
