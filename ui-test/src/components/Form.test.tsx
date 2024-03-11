import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Form from "./Form";

//ユーザーインスタンスのセットアップ
const user = userEvent.setup();

describe("Form", () => {
  it("初期状態は空文字であること", () => {
    // テスト対象のコンポーネントをレンダリング
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument;
    expect(input).toHaveTextContent("");
  });
  it("入力したテキストが送信されること", async () => {
    //alertメソッドのモック化
    const alertSpy = jest.spyOn(window, "alert").mockReturnValue();

    // テスト対象のコンポーネントをレンダリング
    render(<Form />);
    const input = screen.getByPlaceholderText("Enter text");
    await user.type(input, "テスト");
    expect(screen.getByDisplayValue("テスト")).toBeInTheDocument();

    //サブミットボタンを押してalertに文字列が表示されること
    const button = screen.getByRole("button", { name: "Submit" });
    await user.click(button);
    // expect(window.alert).toHaveBeenCalledWith("submitted: テスト");
    //スパイを使ってアサートを書いて
    expect(alertSpy).toHaveBeenCalledWith("submitted: テスト");

    //alertメソッドのモックを解除
    alertSpy.mockRestore();
  });
});
