<template>
  <div class="todo-list">
    <TodoListItem
      v-for="(todo, index) in todos"
      :key="todo.id"
      :id="todo.id"
      :text="todo.text"
      :isFinished="todo.isFinished"
      :dateCreated="todo.dateCreated"
    >
    </TodoListItem>
  </div>
</template>

<script setup lang="ts">
import TodoListItem from "Components/TodoList/TodoListItem.vue";
import { useTodosStore } from "Stores/todos";
import { computed } from "vue";

const todosStore = useTodosStore();
const todos = computed(() => {
  return todosStore.filteredTodos;
});
</script>

<style scoped lang="scss">
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
</style>
