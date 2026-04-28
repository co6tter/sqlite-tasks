# sqlite-tasks

## Overview

TypeScript と SQLite を組み合わせたシンプルなタスク管理ライブラリです。`better-sqlite3` の同期 API を用いてタスクの追加・一覧取得・削除を行います。学習目的のプロジェクトとして、SQLite ドライバーの使い方と TypeScript での DB 操作パターンを確認できます。

## Tech Stack

- **TypeScript 6** — 型付き実装言語
- **better-sqlite3 12** — 同期 API の SQLite ドライバー（メイン実装）
- **sqlite3 6** — コールバックベースの SQLite ドライバー（比較用実装）
- **Vitest 4** — テストフレームワーク / カバレッジ（v8）
- **Biome 2** — リンター / フォーマッター
- **lefthook 2** — Git フック管理（pre-commit で Biome を実行）
- **pnpm** — パッケージマネージャー

## Prerequisites

- **Node.js 24.x**（mise 経由推奨: `mise use node@24`）
- **pnpm**（`npm install -g pnpm` または `mise use pnpm@latest`）

## Setup

```bash
# 1. リポジトリをクローン
git clone https://github.com/co6tter/sqlite-tasks.git
cd sqlite-tasks

# 2. 依存関係をインストール
pnpm install

# 3. Git フックを有効化
pnpm exec lefthook install
```

## Usage

### テスト実行

```bash
# 全テストを実行
pnpm test

# ウォッチモードでテスト
pnpm run test:watch

# カバレッジレポートを生成（coverage/ に出力）
pnpm run coverage
```

### ライブラリとして使う

```typescript
import { initializeDb, closeDb } from "./src/db";
import { addTask, listTasks, deleteTask } from "./src/better-main";

initializeDb("tasks.db");

addTask("買い物をする");
addTask("README を読む");

const tasks = listTasks();
console.log(tasks);
// [{ id: 1, description: '買い物をする', created_at: '...' }, ...]

deleteTask(tasks[0].id);

closeDb();
```

## Directory Structure

```
.
├── src/
│   ├── better-main.ts    # タスク操作（add / list / delete）
│   ├── db.ts             # DB 初期化・接続管理
│   ├── main.ts           # sqlite3 版の比較実装
│   └── types.ts          # Task 型定義
├── tests/
│   ├── better-main.spec.ts  # タスク操作のテスト
│   └── setup.ts             # テスト用 DB 初期化セットアップ
├── biome.json            # Biome 設定
├── lefthook.yml          # Git フック設定
├── vitest.config.ts      # Vitest 設定
└── package.json
```

## License

MIT
