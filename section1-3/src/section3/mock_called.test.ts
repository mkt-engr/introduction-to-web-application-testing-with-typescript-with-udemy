it("モック関数が呼び出されること", () => {
  const mock = jest.fn();
  mock();
  expect(mock).toHaveBeenCalled();
});

//モック関数が2回呼び出されること
it("モック関数が2回呼び出されること", () => {
  const mock = jest.fn();
  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
});

//モック関数に引数fefefeが渡されること
it("モック関数に引数が渡されること", () => {
  const mock = jest.fn();
  mock("fefefe");
  expect(mock).toHaveBeenCalledWith("fefefe");
});
