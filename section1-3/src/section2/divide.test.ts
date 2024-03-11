import { divide, ZeroDivisorError } from "./divide";

//toThrowでエラーが発生することを確認する
it("0で割るとエラーが発生する", () => {
  expect(() => divide(1, 0)).toThrow(ZeroDivisorError);
});
it("割り算テスト 1/1=1", () => {
  expect(divide(1, 1)).toBe(1);
});
