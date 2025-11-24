# sqlite-tasks

## Overview

SQLiteを使用したシンプルなタスク管理CLIツール。コマンドラインからタスクの追加、表示、削除が可能です。

## Tech Stack

- **Node.js** - ランタイム環境
- **TypeScript** - プログラミング言語
- **SQLite** - データベース
  - `sqlite3` - コールバックベースの実装
  - `better-sqlite3` - 同期APIベースの実装
- **Vitest** - テストフレームワーク
- **Biome** - リンター/フォーマッター
- **lefthook** - Git フック管理

## Setup

リポジトリをクローン後、以下のコマンドで依存関係をインストール:

```bash
npm install
```

初回セットアップ時は以下のパッケージがインストールされます:

```bash
npm init -y
npm install sqlite3 better-sqlite3
npm install --save-dev ts-node typescript @types/node @types/sqlite3 @types/better-sqlite3
npm install --save-dev vitest @vitest/coverage-v8
npm install --save-dev @biomejs/biome lefthook
npx tsc --init
```

## Usage

### 基本コマンド

タスクを追加:
```bash
ts-node src/main.ts add "タスク内容"
```

タスク一覧を表示:
```bash
ts-node src/main.ts list
```

タスクを削除 (IDを指定):
```bash
ts-node src/main.ts delete [タスクID]
```

### テスト実行

```bash
# テストを実行
npm test

# ウォッチモードでテスト
npm run test:watch

# カバレッジレポートを生成
npm run coverage
```

## Directory Structure

```
.
├── src/
│   ├── main.ts           # sqlite3版のメインエントリーポイント
│   ├── better-main.ts    # better-sqlite3版の実装
│   ├── db.ts             # データベース接続管理
│   └── types.ts          # 型定義
├── tests/
│   ├── better-main.spec.ts  # テストファイル
│   └── setup.ts             # テストセットアップ
├── tasks.db              # SQLiteデータベースファイル
├── biome.json            # Biome設定ファイル
├── lefthook.yml          # lefthook設定ファイル
├── vitest.config.ts      # Vitest設定ファイル
└── package.json
```

## License

This repository is for personal/private use only.
