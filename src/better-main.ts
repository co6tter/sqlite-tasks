import { getDb } from "./db";
import type { Task } from "./types";

export function addTask(description: string) {
  const db = getDb();
  db.prepare("INSERT INTO tasks (description) VALUES (?)").run(description);
}

export function listTasks(): Task[] {
  const db = getDb();
  return db.prepare("SELECT * FROM tasks").all() as Task[];
}

export function deleteTask(id: number) {
  const db = getDb();
  db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
}
