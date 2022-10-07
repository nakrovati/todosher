import { describe, beforeEach, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodosStore } from "./todos";
import type { ITodo } from "Types/types";

class Todo implements ITodo {
  id: number;
  text: string;
  isFinished: boolean;
  dateCreated: Date;

  constructor(
    id: number,
    text: string,
    isFinished: boolean,
    dateCreated: Date
  ) {
    this.id = id;
    this.text = text;
    this.isFinished = isFinished;
    this.dateCreated = dateCreated;
  }
}

describe("the todos store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Getters
  it("gives a todo by id", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);
    expect(todosStore.todoById).toBeUndefined;

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todoById(todo2.id)).toStrictEqual(todo2);
  });

  it("gives finished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);
    expect(todosStore.finishedTodos).toBeUndefined;

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.finishedTodos).toStrictEqual([todo2]);
  });

  it("gives unfinished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);
    expect(todosStore.unfinishedTodos).toBeUndefined;

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.unfinishedTodos).toStrictEqual([todo1]);
  });

  it("gives filtered todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);
    expect(todosStore.unfinishedTodos).toBeUndefined;

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.filteredTodos).toStrictEqual([todo2, todo1]);

    todosStore.$patch({ filter: "finished" });

    expect(todosStore.filteredTodos).toStrictEqual([todo2]);

    todosStore.$patch({ filter: "unfinished" });

    expect(todosStore.filteredTodos).toStrictEqual([todo1]);
  });

  // Actions
  it("adds a new todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo2, todo1]);
  });

  it("completes the todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(1, "First todo", false, new Date());

    todosStore.addTodo(todo1);

    expect(todosStore.unfinishedTodos).toStrictEqual([todo1]);
    expect(todosStore.finishedTodos).toStrictEqual([]);

    todosStore.completeTodo(1);

    expect(todosStore.unfinishedTodos).toStrictEqual([]);
    expect(todosStore.finishedTodos).toStrictEqual([todo1]);
  });

  it("deletes a todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(1, "First todo", false, new Date());
    const todo2 = new Todo(2, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo2, todo1]);

    todosStore.deleteTodo(todo1.id);

    expect(todosStore.todos).toStrictEqual([todo2]);
  });

  it("does not delete todo if it is not found", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(1, "First todo", true, new Date());

    todosStore.addTodo(todo1);

    expect(todosStore.todos).toStrictEqual([todo1]);

    todosStore.deleteTodo(1_000_000_000_000);

    expect(todosStore.todos).toStrictEqual([todo1]);
  });
});
