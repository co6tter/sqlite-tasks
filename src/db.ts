import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function initializeDb(filePath = ":memory:") {
  db = new Database(filePath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  return db;
}

export function getDb() {
  if (!db) throw new Error("Database not initialized");
  return db;
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
