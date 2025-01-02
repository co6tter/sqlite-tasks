# sqlite-tasks

## Setup

```bash
npm init -y
npm install sqlite3
npm install --save-dev ts-node typescript @types/node @types/sqlite3
npx tsc --init
```

## Usage

```bash
ts-node main.ts add "タスク内容"
ts-node main.ts list
ts-node main.ts delete [タスクID]
```

## Note

- 学習用
- ts-nodeはtsファイルを直接実行できる
- tscでコンパイルしてjsにしなくてもよい
