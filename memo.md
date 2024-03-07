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
