import fs from "fs";
import { readFile } from "./mock_module";

//モジュールのパスを引数に渡してfsモジュールをモック化
jest.mock("fs");
const mockFs = jest.mocked(fs);
mockFs.readFileSync.mockReturnValue("test data");

//readFileがデータを返却すること
it("readFileがデータを返却すること", () => {
  const data = readFile("path/to/file.txt");
  expect(data).toBe("test data");
  expect(fs.readFileSync).toHaveBeenCalledTimes(1);
});
