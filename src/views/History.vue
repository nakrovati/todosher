<template>
  <h1 class="inner">Todo history</h1>
  <TodoList filter="finished"></TodoList>
</template>

<script setup lang="ts">
import TodoList from "Components/TodoList/TodoList.vue";
import { useTodosStore } from "Stores/todos";

const todosStore = useTodosStore();

todosStore.$patch({ filter: "finished" });
</script>
