import express from "express";
import { GroupService } from "../services/groupService";
import { GroupController } from "./groupController";
import { Group } from "../type";

describe("GroupControllerのテスト", () => {
  let mockGroupService: Partial<GroupService>;
  let req: Partial<express.Request>;
  let res: Partial<express.Response>;
  let next: jest.Mock;
  let groupController: GroupController;

  beforeEach(() => {
    //各コントローラーで内で呼ばれるサービスをモック化
    //サービスはDBに依存しているためモック化しないと安定したテストができない（各のデータベースの状況によってテストが成功したり失敗したりする）

    mockGroupService = {
      //とりあえず関数であるということだけをモックかしておく
      //あとでmockReturnValueOnceなどで返り値を設定する
      getGroups: jest.fn(),
      getGroupByName: jest.fn(),
      addGroup: jest.fn(),
    };

    groupController = new GroupController(mockGroupService as GroupService);
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), //グローバルオブジェクトのthisを返す
      json: jest.fn(),
      send: jest.fn(),
    };

    next = jest.fn();
  });
  describe("addGroupのテスト", () => {
    it("グループが登録されること", () => {
      const group: Group = { name: "group1", members: ["user1", "user2"] };
      req.body = group;
      //何も登録されていない場合をモック
      //コントローラー内で呼ばれるサービスの関数の返り値をモック化
      (mockGroupService.getGroups as jest.Mock).mockReturnValueOnce([]);

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(mockGroupService.addGroup).toHaveBeenCalledWith(group);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("バリデーションエラー：グループ名は必須", () => {
      const invalidGroup: Group = { name: "", members: ["user1", "user2"] };
      req.body = invalidGroup;

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["グループ名は必須です"]);
    });

    it("バリデーションエラー：メンバーは2人以上必須であること", () => {
      const invalidGroup: Group = { name: "group1", members: ["user1"] };
      req.body = invalidGroup;

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["メンバーは2人以上必要です"]);
    });
    it("バリデーションエラー：メンバーの名前が同じ場合は登録できない", () => {
      const invalidGroup: Group = {
        name: "group1",
        members: ["user1", "user1"],
      };

      req.body = invalidGroup;

      groupController.addGroup(
        req as express.Request,
        res as express.Response,
        next as express.NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["メンバー名が重複しています"]);
    });
  });
});
