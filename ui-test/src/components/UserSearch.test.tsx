import { render, screen } from "@testing-library/react";
import { UserSearch } from "./UserSearch";
import userEvent from "@testing-library/user-event";
import axios from "axios";

const user = userEvent.setup();
describe("UserSearchコンポーネントのテスト", () =>
  // 1. 入力フィールドに値を入力し、検索ボタンをクリックすると適切なAPIリクエストが発生することを確認する
  it("入力フィールドに値を入力し、検索ボタンをクリックすると適切なAPIリクエストが発生することを確認する", async () => {
    //axiosのモック化
    const axiosSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: { id: 1, name: "test" } });

    //レンダリング
    render(<UserSearch />);

    //入力フィールドに値を入力
    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    //検索ボタンをクリック
    const button = screen.getByRole("button");
    await user.click(button);

    //APIリクエストが発生していることを確認
    expect(axiosSpy).toHaveBeenCalledWith("/api/users?query=test");

    //testが表示されていることを確認
    expect(await screen.findByText("test")).toBeInTheDocument();

    //axiosのモックを解除
    axiosSpy.mockRestore();
  }));
