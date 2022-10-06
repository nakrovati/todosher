<template>
  <h1 class="inner">Todo list</h1>
  <CreateTodo></CreateTodo>
  <TodoList></TodoList>
</template>

<script setup lang="ts">
import CreateTodo from "Components/TodoList/CreateTodo.vue";
import TodoList from "Components/TodoList/TodoList.vue";
import { useTodosStore } from "Stores/todos";

const todosStore = useTodosStore();

todosStore.$patch({ filter: "unfinished" });
</script>

<style scoped lang="scss">
.todo {
  margin: 1.5em 0 1em;
}
</style>
