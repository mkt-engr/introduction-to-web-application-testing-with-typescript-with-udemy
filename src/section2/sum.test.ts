import { sum } from "./sum";
it("足し算テスト 1+1=2", () => {
  expect(sum(1, 1)).toBe(2);
});

//パラメトライズドテスト（複数の似たようなテストをまとめて実行する）
//ドキュメント：https://jestjs.io/ja/docs/api#testeachtablename-fn-timeout
it.each`
  a    | b     | expected
  ${1} | ${1}  | ${2}
  ${1} | ${-2} | ${-1}
  ${2} | ${1}  | ${3}
`("足し算テスト $a + $b = $expected", ({ a, b, expected }) => {
  expect(sum(a, b)).toBe(expected);
});

it.failing.each`
  a    | b | expected
  ${1} | ${1} |${3}
  ${1} | ${-2}|${2}
  ${2} | ${1}|${1}
`("失敗するテスト $a + $b", ({ a, b, expected }) => {
  expect(sum(a, b)).toBe(expected);
});
