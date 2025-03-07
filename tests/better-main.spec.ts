import { describe, expect, it } from "vitest";
import { addTask, deleteTask, listTasks } from "../src/better-main";

describe("Task Management", () => {
  it("should add a task", () => {
    addTask("Test Task");
    const tasks = listTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].description).toBe("Test Task");
  });

  it("should delete a task", () => {
    addTask("Task to delete");
    const tasks = listTasks();
    const taskId = tasks[0].id;

    deleteTask(taskId);
    const remainingTasks = listTasks();
    expect(remainingTasks).toHaveLength(0);
  });
});
