# sqlite-tasks

## Setup

```bash
npm init -y
npm install sqlite3
npm install --save-dev ts-node typescript @types/node @types/sqlite3
npx tsc --init

npm install better-sqlite3
npm install --save-dev vitest @vitest/coverage-v8 @types/better-sqlite3
```

## Usage

```bash
ts-node src/main.ts add "タスク内容"
ts-node src/main.ts list
ts-node src/main.ts delete [タスクID]
```

## Test

```bash
npm test
npm run test:watch
npm run coverage
```

## Note

- sample
- ts-nodeはtsファイルを直接実行できる
- tscでコンパイルしてjsにしなくてもよい
