//toBe
it("数値のテスト", () => {
  expect(1 + 1).toBe(2);
});

//toEqual
it("オブジェクトのテスト", () => {
  expect({ name: "Taro" }).toEqual({ name: "Taro" });
});

it("配列のテスト", () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  expect(arr1).toEqual(arr2);
});

it("オブジェクトのテスト", () => {
  const obj1 = { name: "Taro" };
  const obj2 = { name: "Taro" };
  expect(obj1).toEqual(obj2);
});

// not
it("1+1は3ではない", () => {
  expect(1 + 1).not.toBe(3);
});
