import express from "express";
import request from "supertest";
import fs from "fs";
import { createApp } from "../src/app";
import { Group, Expense } from "../src/type";

//これらのJSONはデータベースの代わり
const GROUP_FILE_PATH = "../data/integration/groups.json";
const EXPENSE_FILE_PATH = "../data/integration/expenses.json";

const testGroups: Group[] = [
  { name: "group1", members: ["user1", "user2", "user3"] },
  { name: "group2", members: ["user4", "user5"] },
];

const testExpenses: Expense[] = [
  {
    groupName: "group1",
    expenseName: "expense1",
    payer: "user1",
    amount: 1000,
  },
];

describe("結合テスト", () => {
  let app: express.Express;

  beforeEach(() => {
    fs.writeFileSync(GROUP_FILE_PATH, JSON.stringify(testGroups));
    fs.writeFileSync(EXPENSE_FILE_PATH, JSON.stringify(testExpenses));

    app = createApp(GROUP_FILE_PATH, EXPENSE_FILE_PATH);
  });

  describe("GET /groups", () => {
    it("すべてのグループが取得できること", async () => {
      //app.getだとエンドポイント/groupsにリクエストを出したことにならない
      const response = await request(app).get("/groups");
      // console.log(response);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(testGroups);
    });
  });

  describe("POST /groups", () => {
    it("グループが作成されること", async () => {
      const newGroup: Group = { name: "group3", members: ["user6", "user7"] };
      //.sendでリクエストボディを設定
      const response = await request(app).post("/groups").send(newGroup);
      expect(response.status).toBe(200);
      expect(response.text).toBe("グループの作成が成功しました");
    });
  });
});
