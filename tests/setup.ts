import { closeDb, initializeDb } from "../src/db";

beforeAll(() => {
  initializeDb(":memory:");
});

afterAll(() => {
  closeDb();
});

beforeEach(() => {
  const db = initializeDb();
  db.exec("DELETE FROM tasks");
});
