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
