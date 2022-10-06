<template>
  <div class="search-todo">
    <input type="text" class="search-todo__input" placeholder="Todo name" />
    <img :src="IconGlass" alt="Glass icon" class="search-todo__icon" />
  </div>
</template>

<script setup lang="ts">
import IconGlass from "Assets/icons/magnifying-glass-solid.svg";
</script>

<style scoped lang="scss">
.search-todo {
  position: relative;

  .search-todo__input {
    border: none;
    background-color: var(--primary-lighter);
    padding: 0.25rem 0.5rem 0.25rem calc(8px + 20px + 16px);
    border-radius: 5px;
    height: 2em;
  }

  .search-todo__icon {
    position: absolute;
    filter: invert(43%) sepia(6%) saturate(2107%) hue-rotate(314deg)
      brightness(89%) contrast(92%);
    height: 20px;
    top: 50%;
    margin-top: -10px;
    left: 0.5rem;
    width: 20px;
  }
}
</style>
