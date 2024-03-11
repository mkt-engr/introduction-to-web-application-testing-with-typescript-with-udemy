import axios from "axios";
import Users from "./practice";

//第１引数はモジュールのパス
jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("Userクラスのテスト", () => {
  //テスト実行前にmockAxis.getを初期化
  beforeEach(() => {
    mockAxios.get.mockClear();
  });
  it("ユーザーを取得できること", async () => {
    const users = [
      { id: 1, name: "test user" },
      { id: 2, name: "test user2" },
    ];
    const res = { data: users };
    //axiosのgetメソッドの値を設定
    mockAxios.get.mockResolvedValue(res);

    const data = await Users.all();
    expect(data).toEqual(users);
    //利用しているライブラリが呼び出されたことを確認
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
