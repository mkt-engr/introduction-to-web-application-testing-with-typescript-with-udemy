import { act, renderHook } from "@testing-library/react";
import useCounter from "./useCounter";

describe("useCounterのテスト", () => {
  it("incrementが呼ばれるとcountが1増えること", () => {
    // テスト対象の関数を呼び出す
    const { result } = renderHook(() => useCounter(0));

    // 初期値が0であることを検証する
    expect(result.current.count).toBe(0);

    // カスタムフックのincrementを呼び出す
    act(() => {
      result.current.increment();
    });

    //incrementを呼び出した結果1になっていることを検証する
    expect(result.current.count).toBe(1);
  });

  it("decrementが呼ばれるとcountが1減ること", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });
});
