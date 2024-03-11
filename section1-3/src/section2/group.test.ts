//グループ化する
describe("配列に関するテスト", () => {
  it("配列に要素を追加する", () => {
    const array = [];
    array.push("element");
    expect(array).toEqual(["element"]);
  });

  it("配列の長さが正しい", () => {
    const array = ["element1", "element2"];
    expect(array.length).toBe(2);
  });

  describe("配列の検索に関するテスト", () => {
    it("配列の要素を検索できる", () => {
      const array = ["element1", "element2"];
      expect(array.indexOf("element2")).toBe(1);
    });
  });
});
