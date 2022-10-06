<template>
  <button
    class="button"
    type="button"
    :style="{ padding: paddingSize }"
    :disabled="disabled"
    @click="click"
  >
    <slot class="button__text"></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  size: { type: String, default: "small" },
  disabled: { type: Boolean },
});

const paddingSize = computed(() => {
  if (props.size === "large") return "0.5em 1.5em";
  if (props.size === "medium") return "0.25em 1em";
  if (props.size === "small") return "0.25em 1em";
  return "0.25em 0.5em";
});

const emit = defineEmits(["click"]);
function click() {
  emit("click");
}
</script>

<style scoped lang="scss">
.button {
  border-radius: 5px;
  border: none;
}
</style>
