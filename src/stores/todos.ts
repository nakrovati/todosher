import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import createRandomId from "Utils/createRandomId";
import type { ITodo } from "Types/types";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: useStorage<ITodo[]>("todos", []),
    filter: "all",
  }),
  getters: {
    /** Return first todo by id */
    todoById: (state) => {
      return (id: number): ITodo | undefined => {
        if (!state.todos) return undefined;

        return state.todos.find((todo: ITodo): boolean => todo.id === id);
      };
    },
    /** Return finished todos */
    finishedTodos: (state) => {
      if (!state.todos) return [];

      return state.todos.filter((todo: ITodo) => todo.isFinished);
    },
    /** Return unfinished todos */
    unfinishedTodos: (state) => {
      if (!state.todos) return [];

      return state.todos.filter((todo: ITodo) => !todo.isFinished);
    },
    filteredTodos(): ITodo[] | undefined {
      if (this.filter === "finished") {
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    addTodo(todo: ITodo) {
      while (this.todoById(todo.id)) {
        todo.id = createRandomId();
      }

      this.todos.unshift(todo);
    },
    completeTodo(id: number) {
      if (!this.todos) return undefined;

      const todo = this.todos.find((todo: ITodo) => todo.id === id);

      if (!todo) return undefined;

      todo.isFinished = true;
    },
    deleteTodo(id: number) {
      if (!this.todos) return undefined;

      this.todos = this.todos.filter((todo: ITodo) => todo.id !== id);
    },
  },
});
