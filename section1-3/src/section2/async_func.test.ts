import { delay } from "./async_func";

it("delay関数のテスト", async () => {
  const result = await delay("hello", 1000);
  expect(result).toBe("hello");
});
describe("0未満の値を指定した場合エラーが発生する", () => {
  it("書き方その1", async () => {
    await expect(delay("hello", -1000)).rejects.toThrow(
      "timeは0以上で指定してください"
    );
  });
  it("書き方その2", async () => {
    // 以下でも同じ
    try {
      await delay("hello", -1000);
    } catch (error: any) {
      expect(error.message).toBe("timeは0以上で指定してください");
    }
  });
});
