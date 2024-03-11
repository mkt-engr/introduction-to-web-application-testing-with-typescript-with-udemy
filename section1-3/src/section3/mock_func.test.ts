it("初めてのモック", () => {
  // モック関数を作成（引数に処理を渡す）
  const mockFn = jest.fn(() => "I'm a mock function");
  mockFn();
  expect(mockFn()).toBe("I'm a mock function");
});

it("mockImplementation", () => {
  const mockFn = jest.fn();
  mockFn.mockImplementation(() => "I'm a mock function2");
  expect(mockFn()).toBe("I'm a mock function2");
});
