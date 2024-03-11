/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", //ブラウザ側のテストをするため
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], //テスト実行前に実行するファイル JESTの拡張マッチャーが使える(toBeDisabled,toBeEnabledなど)
};
