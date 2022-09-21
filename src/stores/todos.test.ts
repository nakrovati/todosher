import { describe, test, beforeEach, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodosStore } from "./todos";
import createRandomId from "Utils/createRandomId";
import type { ITodo } from "Types/types";

class Todo implements ITodo {
  id: number;
  title: string;
  dateCreated: Date;
  isFinished: boolean;

  constructor(
    id: number,
    title: string,
    dateCreated: Date,
    isFinished: boolean
  ) {
    this.id = id;
    this.title = title;
    this.dateCreated = dateCreated;
    this.isFinished = isFinished;
  }
}

describe("Todos store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Getters
  test("getting an todo by id", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todoById).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", new Date(), false);
    const todo2 = new Todo(createRandomId(), "Second todo", new Date(), true);

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todoById(todo2.id)).toStrictEqual(todo2);
  });

  test("getting finished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.finishedTodos).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", new Date(), false);
    const todo2 = new Todo(createRandomId(), "Second todo", new Date(), true);

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.finishedTodos).toStrictEqual([todo2]);
  });

  test("getting unfinished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.unfinishedTodos).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", new Date(), false);
    const todo2 = new Todo(createRandomId(), "Second todo", new Date(), true);

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.unfinishedTodos).toStrictEqual([todo1]);
  });

  // Actions
  it("adds a new todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(createRandomId(), "First todo", new Date(), false);
    const todo2 = new Todo(createRandomId(), "Second todo", new Date(), true);

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo1, todo2]);
  });

  it("delete a todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(123_456_789, "First todo", new Date(), false);
    const todo2 = new Todo(987_654_321, "Second todo", new Date(), true);

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo1, todo2]);

    todosStore.deleteTodo(todo1.id);

    expect(todosStore.todos).toStrictEqual([todo2]);
  });

  it("does not delete todo not found todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(createRandomId(), "First todo", new Date(), true);

    todosStore.addTodo(todo1);

    expect(todosStore.todos).toStrictEqual([todo1]);

    todosStore.deleteTodo(1_000_000_000_000);

    expect(todosStore.todos).toStrictEqual([todo1]);
  });
});
