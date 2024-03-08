import { Calculator } from "./mock_spy";

it("sumメソッドが呼び出されること", () => {
  const calculator = new Calculator();
  const sumSpy = jest.spyOn(calculator, "sum");
  const result = calculator.sum(1, 2);
  expect(result).toBe(3);
  //sumメソッドが1回呼び出されること
  expect(sumSpy).toHaveBeenCalledTimes(1);

  //sumメソッドに(1,2)という引数が渡されること
  expect(sumSpy).toHaveBeenCalledWith(1, 2);

  //他のテストに影響が出ないようにスパイをクリア
  sumSpy.mockClear();
  sumSpy.mockRestore();
});
