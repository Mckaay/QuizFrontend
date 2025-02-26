<script setup>
import { computed } from "vue";

const props = defineProps({
  currentStep: {
    type: Number,
    default: 1,
  },
  lastStep: {
    type: Number,
    default: 5,
  },
});

const width = computed(() => {
  return ((props.currentStep / props.lastStep) * 100).toFixed(2);
});
</script>

<template>
  <p class="text-md font-medium ml-auto">
    {{ currentStep }} / {{ lastStep }}
  </p>
  <div class="relative h-4 overflow-hidden rounded-full bg-primary/20 w-full">
    <div
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - width}%)` }"
    />
  </div>
</template>

<style lang="scss" scoped></style>
