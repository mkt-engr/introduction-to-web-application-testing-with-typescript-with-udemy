import { render, screen, waitFor } from "@testing-library/react";
import { UserSearch } from "./UserSearch";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
//TSの場合、コンパイラにAxiosがモック化されていることを明示明示的に伝える必要がある
const mockAxios = jest.mocked(axios);

const user = userEvent.setup();
describe("UserSearchコンポーネントのテスト", () => {
  beforeEach(async () => {
    //axiosのモックを解除
    mockAxios.get.mockReset();
  });

  it("入力フォームに入力した内容でAPIリクエストが送信されること", async () => {
    //レスポンスのモック化
    const userInfo = {
      id: 1,
      name: "test",
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);
    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`
    );
  });

  it("APIから取得したユーザー情報が画面に表示されること", async () => {
    //レスポンスのモック化
    const userInfo = {
      id: 1,
      name: "test",
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);
    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() =>
      expect(screen.getByText(userInfo.name)).toBeInTheDocument()
    );
  });
});

//axiosのモックを解除
