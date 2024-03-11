# セクション 2

## setup_teardown.test.ts

コンソールへの出力順

回答

```
outer beforeAll

outer beforeEach
  outer test 1
outer afterEach

outer beforeEach
  outer test 2
outer afterEach

outer beforeEach
  inner beforeAll

  inner beforeEach
  inner test 1
  inner afterEach

  inner beforeEach
  inner test 2
  inner afterEach

  inner afterAll
outer afterEach

outer afterAll
```

正解

```
outer beforeAll

outer beforeEach
  outer test 1
outer afterEach

outer beforeEach
  outer test 2
outer afterEach


  inner beforeAll
    outer beforeEach
    inner beforeEach
    inner test 1
    inner afterEach
    outer afterEach

    outer beforeEach
    inner beforeEach
    inner test 2
    inner afterEach
    outer afterEach
  inner afterAll
outer afterAll
```

# セクション 3

## スパイについて

jest.spyOn 関数は 2 つの引数を取ります。

- object: スパイを設定するオブジェクト。このオブジェクトは、メソッドを持つ任意の JavaScript オブジェクトである必要があります。
- method: スパイを設定するメソッドの名前。このメソッドは、上記のオブジェクトのメソッドである必要があります。

この関数は、指定されたオブジェクトのメソッドにスパイを設定します。スパイは、そのメソッドがどのように呼び出されたか（どの引数で、何回、どのような結果を返したかなど）を記録します。これにより、テスト中にそのメソッドの使用方法を検証することができます。

例えば、あなたのコードでは、Calculator クラスのインスタンス calculator の sum メソッドにスパイを設定しています。これにより、sum メソッドがどのように呼び出されたかを検証することができます。

## スパイのクリア

mockClear()と mockReset()は、Jest のモック関数に対して使用されるメソッドで、それぞれ異なる動作をします。

- `mockClear()`: これはモック関数の呼び出し履歴をクリアします。つまり、mock.calls と mock.instances プロパティを空にします。しかし、モック関数自体やその実装（mockImplementation や mockReturnValue で設定されたもの）は変更されません。

- `mockReset()`: これは mockClear()の動作に加えて、モック関数の実装もクリアします。つまり、mockImplementation や mockReturnValue で設定された実装も削除されます。
- `mockRestore()`:jest.spyOn()で作成されたモック関数に対して使用され、モック関数を元の実装に戻します。つまり、スパイを設定する前の状態に戻します。

## モジュール全体のモック化

`fs.readFileSync`とかをモック化したい

```typescript
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
```

# セクション 4

```
npm i -D jest @types/jest ts-jest
npm i -D jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

テストの初期化

```
npx ts-jest config:init
```

jest.config.ts が作成される

vite は ESModule なので jest.config.js にエラーが出る

```ts
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

これを`export default`に変更する

```ts
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // UIのテストを行うため
};
```

CommonJS と ESModule の違いによりテスト実行時に警告が出るので

tsconfig.json を書き換える

```json
{
  "compilerOptions": {
    ~~~
    "esModuleInterop":true
 }
}
```

copilot に聞くとこんな答え

```markdown
esModuleInterop は TypeScript のコンパイラオプションの一つで、ES モジュールと CommonJS モジュール間の相互運用性を向上させるためのものです。

TypeScript の esModuleInterop オプションを true に設定すると、CommonJS モジュールをデフォルトインポートとして扱うことができます。これは、JavaScript の ES モジュールの構文を使用して CommonJS モジュールをインポートするときに便利です。

例えば、次のような CommonJS モジュールがあるとします。

esModuleInterop が false（または設定されていない）場合、このモジュールをインポートするには次のように書く必要があります。

しかし、esModuleInterop が true に設定されている場合、次のようにデフォルトインポートとして扱うことができます。

import myModule from './myModule';
このオプションは、JavaScript の ES モジュールと CommonJS モジュール間の互換性を向上させ、より自然なインポート構文を可能にします。
```

さらに jest.setup.ts を追加
