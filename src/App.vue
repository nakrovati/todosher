<template>
  <TheHeader></TheHeader>
  <TheContainer>
    <router-view></router-view>
  </TheContainer>
  <TheFooter></TheFooter>
</template>

<script setup lang="ts">
import TheHeader from "Components/layout/TheHeader.vue";
import TheFooter from "Components/layout/TheFooter.vue";
import TheContainer from "Components/layout/TheContainer.vue";

if (window.matchMedia("(prefers-color-scheme: dark)").matches)
  document.documentElement.classList.add("dark");
</script>

<style scoped lang="scss">
.container {
  padding: 1em;
}
</style>
