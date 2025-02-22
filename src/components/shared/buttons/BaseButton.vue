<script setup>
import { defineProps } from "vue";

defineProps({
  type: {
    type: String,
    default: "button",
  },
});
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  >
    <slot />
  </button>
</template>
