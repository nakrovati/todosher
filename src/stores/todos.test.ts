import { describe, test, beforeEach, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useTodosStore } from "./todos";
import createRandomId from "Utils/createRandomId";
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

describe("Todos store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  // Getters
  test("getting an todo by id", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todoById).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", false, new Date());
    const todo2 = new Todo(createRandomId(), "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todoById(todo2.id)).toStrictEqual(todo2);
  });

  test("getting finished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.finishedTodos).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", false, new Date());
    const todo2 = new Todo(createRandomId(), "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.finishedTodos).toStrictEqual([todo2]);
  });

  test("getting unfinished todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.unfinishedTodos).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", false, new Date());
    const todo2 = new Todo(createRandomId(), "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.unfinishedTodos).toStrictEqual([todo1]);
  });

  test.skip("getting filtered todos", () => {
    const todosStore = useTodosStore();
    expect(todosStore.unfinishedTodos).toBeUndefined;

    const todo1 = new Todo(createRandomId(), "First todo", false, new Date());
    const todo2 = new Todo(createRandomId(), "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.filteredTodos).toStrictEqual([todo1]);
  });

  // Actions
  it("adds a new todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(123_456_789, "First todo", false, new Date());
    const todo2 = new Todo(987_654_321, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo2, todo1]);
  });

  it("completes the todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(123_456_789, "First todo", false, new Date());

    todosStore.addTodo(todo1);

    expect(todosStore.unfinishedTodos).toStrictEqual([todo1]);
    expect(todosStore.finishedTodos).toStrictEqual([]);

    todosStore.completeTodo(123_456_789);

    expect(todosStore.unfinishedTodos).toStrictEqual([]);
    expect(todosStore.finishedTodos).toStrictEqual([todo1]);
  });

  it("delete a todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(123_456_789, "First todo", false, new Date());
    const todo2 = new Todo(987_654_321, "Second todo", true, new Date());

    todosStore.addTodo(todo1);
    todosStore.addTodo(todo2);

    expect(todosStore.todos).toStrictEqual([todo2, todo1]);

    todosStore.deleteTodo(todo1.id);

    expect(todosStore.todos).toStrictEqual([todo2]);
  });

  it("does not delete todo not found todo", () => {
    const todosStore = useTodosStore();
    expect(todosStore.todos).toStrictEqual([]);

    const todo1 = new Todo(createRandomId(), "First todo", true, new Date());

    todosStore.addTodo(todo1);

    expect(todosStore.todos).toStrictEqual([todo1]);

    todosStore.deleteTodo(1_000_000_000_000);

    expect(todosStore.todos).toStrictEqual([todo1]);
  });
});
