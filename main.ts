import sqlite3 from "sqlite3";

let db: sqlite3.Database | null = null;

async function initializeDb(): Promise<void> {
  if (!db) {
    db = await new Promise<sqlite3.Database>((resolve, reject) => {
      const database = new sqlite3.Database("./tasks.db", (err) => {
        if (err) {
          console.error("データベース接続時にエラーが発生しました:", err);
          reject(err);
        } else {
          console.log("データベースに接続しました！");
        }
      });
      resolve(database);
    });

    await new Promise<void>((resolve, reject) => {
      db!.run(
        `
                CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    description TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
                `,
        (err) => {
          if (err) {
            console.error("テーブル作成中にエラーが発生しました:", err);
            reject(err);
          } else {
            console.log("テーブルを確認または作成しました。");
            resolve();
          }
        }
      );
    });
  }
}

function addTask(description: string) {
  if (!db) {
    console.error("データベースが初期化されていません！");
    return;
  }
  db.run("INSERT INTO tasks (description) VALUES (?)", description, (err) => {
    if (err) {
      console.error("タスク追加中にエラーが発生しました:", err);
    } else {
      console.log("タスクを追加しました！");
    }
  });
}

function listTasks() {
  if (!db) {
    console.error("データベースが初期化されていません！");
    return;
  }
  db.all("SELECT id, description, created_at FROM tasks", [], (err, rows) => {
    if (err) {
      console.error("タスクの取得中にエラーが発生しました:", err);
    } else if (rows.length === 0) {
      console.log("タスクはありません。");
    } else {
      rows.forEach((task: any) => {
        console.log(
          `${task.id}: ${task.description} (作成日時: ${task.created_at})`
        );
      });
    }
  });
}

function deleteTask(taskId: number) {
  if (!db) {
    console.error("データベースが初期化されていません！");
    return;
  }
  db.run("DELETE FROM tasks WHERE id = ?", taskId, function (err) {
    if (err) {
      console.error("タスク削除中にエラーが発生しました:", err);
    } else if (this.changes === 0) {
      console.log("指定されたタスクIDが見つかりませんでした。");
    } else {
      console.log("タスクを削除しました！");
    }
  });
}

function closeDb() {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("データベースのクローズ中にエラーが発生しました:", err);
      } else {
        console.log("データベース接続を閉じました。");
      }
    });
  }
}

async function main() {
  await initializeDb();

  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(
      "使用方法: ts-node main.ts [add|list|delete] [タスク内容|タスクID]"
    );
    closeDb();
    return;
  }

  if (command === "add") {
    const description = args.slice(1).join(" ");
    if (!description) {
      console.log("タスク内容を指定してください。");
    } else {
      addTask(description);
    }
  } else if (command === "list") {
    listTasks();
  } else if (command === "delete") {
    const taskId = parseInt(args[1], 10);
    if (isNaN(taskId)) {
      console.log("削除するタスクIDを指定してください。");
    } else {
      deleteTask(taskId);
    }
  } else {
    console.log("不明なコマンドです。");
  }

  closeDb();
}

main();
