<template>
  <header class="header">
    <router-link class="header__title" to="/">Todosher</router-link>
    <router-link class="header__title" to="/todosher/history/"
      >History</router-link
    >
  </header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  padding: 0 1em;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background-color: var(--primary);
  gap: 2em;

  @media screen and (max-width: 375px) {
    gap: 1em;
  }

  .header__title {
    font-size: 24px;
    color: var(--white);
    text-decoration: none;
  }
}
</style>
