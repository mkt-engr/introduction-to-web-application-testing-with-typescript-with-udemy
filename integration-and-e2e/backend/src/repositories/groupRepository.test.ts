import fs from "fs";
import { GroupRepository } from "./groupRepository";
import { Group } from "../type";

// fsモジュールを全てモック化するのでファイルパスを書く必要がある
// fsモジュールの全てのメソッドがJestのモック関数に置き換えられる
jest.mock("fs");

describe("GroupRepositoryのテスト", () => {
  //モック化されたオブジェクトの型を正しく保持するために使用
  const mockFs = jest.mocked(fs);

  //このようにfsのreadFileSyncメソッドだけをモック化することもできる
  const mockFsReadFileSync = jest.mocked(fs.readFileSync);

  let repo: GroupRepository;

  beforeEach(() => {
    mockFs.existsSync.mockClear();
    mockFs.readFileSync.mockClear();
    mockFs.writeFileSync.mockClear();
    repo = new GroupRepository("groups.json");

    //こういう書き方になる
    mockFsReadFileSync.mockClear();
  });

  describe("loadGroupsのテスト", () => {
    it("グループ一覧が取得できること", () => {
      const groups: Group[] = [
        {
          name: "グループ1",
          members: ["user1", "user2"],
        },
        {
          name: "グループ2",
          members: ["user3", "user4"],
        },
      ];
      const mockData = JSON.stringify(groups);
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(mockData);

      const result = repo.loadGroups();
      expect(result).toEqual(groups);
    });

    it("読み込むファイルが存在しない場合は空配列が返却されること", () => {
      mockFs.existsSync.mockReturnValueOnce(false);
      const result = repo.loadGroups();
      expect(result).toEqual([]);
    });
  });

  describe("saveGroupのテスト", () => {
    it("グループが保存されること", () => {
      const currentGroups: Group[] = [
        {
          name: "グループ1",
          members: ["user1", "user2"],
        },
        {
          name: "グループ2",
          members: ["user3", "user4"],
        },
      ];

      const addedGroup: Group = {
        name: "グループ3",
        members: ["user5", "user6"],
      };
      mockFs.existsSync.mockReturnValueOnce(true);
      mockFs.readFileSync.mockReturnValueOnce(JSON.stringify(currentGroups));

      repo.saveGroup(addedGroup);
      expect(mockFs.writeFileSync).toHaveBeenCalledWith(
        "groups.json",
        JSON.stringify([...currentGroups, addedGroup])
      );
    });
  });
});
