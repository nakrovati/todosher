<template>
  <div class="todo-list-item">
    <button
      type="button"
      @click="completeTodo"
      class="btn-complete-todo"
      :class="{ disabled: isFinished }"
      :disabled="isFinished"
      aria-label="Complete task"
    >
      <img
        class="btn-complete-todo__circle-icon"
        :src="IconCircle"
        aria-hidden="true"
      />
      <img
        v-show="!isFinished"
        class="btn-complete-todo__check-icon"
        :src="IconCheck"
        alt="Icon check"
        aria-hidden="true"
      />
    </button>
    <span> {{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import IconCircle from "Assets/icons/circle-regular.svg";
import IconCheck from "Assets/icons/check-solid.svg";
import { useTodosStore } from "Stores/todos";

const todosStore = useTodosStore();

const props = defineProps({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  isFinished: { type: Boolean, required: true },
});

function completeTodo() {
  todosStore.completeTodo(props.id);
}
</script>

<style scoped lang="scss">
.todo-list-item {
  height: 48px;
  padding: 0.5em 1em;
  background-color: var(--todo-list-item-bg);
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  align-items: center;
}

.btn-complete-todo {
  padding: 0;
  margin: 0;
  border: 0;
  background-color: inherit;
  margin-right: 1em;
  display: flex;
  position: relative;

  &:hover .btn-complete-todo__check-icon,
  &:focus .btn-complete-todo__check-icon {
    opacity: 1;
  }

  &.disabled {
    .btn-complete-todo__circle-icon,
    .btn-complete-todo__check-icon {
      filter: invert(0.6);
    }
  }

  .btn-complete-todo__circle-icon {
    filter: invert(43%) sepia(6%) saturate(2107%) hue-rotate(314deg)
      brightness(89%) contrast(92%);
    height: 20px;
    width: 20px;
  }

  .btn-complete-todo__check-icon {
    opacity: 0;
    transition: 0.2s opacity;
    filter: invert(43%) sepia(6%) saturate(2107%) hue-rotate(314deg)
      brightness(89%) contrast(92%);
    height: 16px;
    width: 16px;
    position: absolute;
    left: 2px;
    top: 2px;
  }
}
</style>
