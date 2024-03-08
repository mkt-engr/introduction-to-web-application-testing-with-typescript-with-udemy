import { ShoppingList } from "./practice";
describe("ShoppingListのテスト", () => {
  let shoppingList: ShoppingList;
  beforeEach(() => {
    shoppingList = new ShoppingList();
  });

  describe("addItemメソッドのテスト", () => {
    it("アイテムをリストに追加できること", () => {
      shoppingList.addItem("りんご");
      expect(shoppingList.list).toEqual(["りんご"]);
    });
  });

  describe("removeItemメソッドのテスト", () => {
    it("アイテムをリストから削除できること", () => {
      shoppingList.addItem("りんご");
      shoppingList.addItem("みかん");
      shoppingList.removeItem("りんご");
      // expect(shoppingList.list).toEqual(["みかん"]);
      expect(shoppingList.list).not.toContain("りんご");
    });
    it("存在しないアイテムの削除を試みたときにエラーをスローすること", () => {
      expect(() => {
        shoppingList.removeItem("りんご");
      }).toThrow("アイテム: りんご は存在しません");
    });
  });
});
