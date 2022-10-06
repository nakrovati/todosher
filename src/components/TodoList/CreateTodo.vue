<template>
  <div class="todo-create">
    <div class="todo-create__input-block">
      <input
        type="text"
        class="todo-create__input"
        v-model="todoText"
        :style="{ borderRadius: inputBorderRadius }"
        placeholder="Add a task"
      />
      <img class="todo-create__icon" :src="IconPlus" alt="Icon plus" />
    </div>
    <div v-if="helpersShown" class="todo-create__helpers">
      <BaseButton @click="addTodo" type="button"> Add </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import IconPlus from "Assets/icons/plus-solid.svg";
import BaseButton from "Components/common/BaseButton.vue";
import { useTodosStore } from "Stores/todos";
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

const todosStore = useTodosStore();
const todoText = ref("");

function addTodo() {
  todosStore.addTodo(
    new Todo(createRandomId(), todoText.value, false, new Date())
  );
  todoText.value = "";
}

const helpersShown = ref(false);

const inputBorderRadius = computed(() => {
  return helpersShown.value ? "5px 5px 0 0" : "5px";
});

const todoTextEntered = computed(() => {
  return helpersShown.value || !!todoText.value.length;
});

watch(todoTextEntered, () => {
  helpersShown.value = true;
});
</script>

<style scoped lang="scss">
.todo-create {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 1em;
  border-radius: 5px;

  .dark & {
    box-shadow: none;
  }

  .todo-create__input-block {
    position: relative;
    height: 48px;

    .todo-create__input {
      background-color: var(--primary-lighter);
      border: 0;
      padding: 0.5em 1em 0.5em calc(16px + 20px + 16px);
      height: 100%;
      width: 100%;

      &::placeholder {
        color: var(--primary);
      }
    }

    .todo-create__icon {
      width: 20px;
      filter: invert(43%) sepia(6%) saturate(2107%) hue-rotate(314deg)
        brightness(89%) contrast(92%);
      position: absolute;
      top: 50%;
      margin-top: -10px;
      left: 1em;
      height: 20px;
    }
  }

  .todo-create__helpers {
    height: 48px;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    padding: calc(0.5em - 1px) 1em 0.5em;
    border-top: 1px solid #e1dfdd;
    border-radius: 5px;

    .dark & {
      border: none;
      background-color: var(--create-todo-helpers-bg);
    }

    .helpers__btn-add-todo {
      padding: 0.25em 0.5em;
      background-color: var(--white);
      border: 1px solid #e1dfdd;
      border-radius: 5px;

      .dark & {
        background-color: var(--primary-lighter);
        border: none;
      }
    }
  }
}
</style>
