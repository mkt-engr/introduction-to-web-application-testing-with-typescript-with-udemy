it("モックに戻り値を設定する", () => {
  const mock = jest.fn();
  //モック関数の返り値を設定
  mock.mockReturnValue("return mock value");
  //以下の3つとも成功する
  expect(mock()).toBe("return mock value");
  expect(mock()).toBe("return mock value");
  expect(mock()).toBe("return mock value");
});

it("モックに1度だけ返される戻り値を設定する", () => {
  const mock = jest.fn();
  //モック関数の返り値を設定
  mock.mockReturnValueOnce("return mock value");

  //最初の1つしか成功しない（mockReturnValueOnceを使っているため）
  expect(mock()).toBe("return mock value");
  expect(mock()).toBe("return mock value");
  expect(mock()).toBe("return mock value");
});

//モックに非同期な戻り値を設定するテスト
it("モックに非同期な戻り値を設定する", async () => {
  const mock = jest.fn();
  //モック関数の返り値を設定
  mock.mockResolvedValue("return mock resolved value");

  //非同期関数を実行
  const result = await mock();
  expect(result).toBe("return mock resolved value");
});
