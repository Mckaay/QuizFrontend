<script setup>
  import {useThemeStore} from "@/stores/theme.js";

  const { width } = defineProps(["width"]);
  const themeStore = useThemeStore();
</script>

<template>
  <div class="progress-bar" :class="{ dark: themeStore.isDark }" :style="{ '--progress-width': width + '%' }"></div>
</template>

<style scoped>
  .progress-bar {
    margin-top: var(--spacing-75);
    position: relative;
    width: 100%;
    height: 16px;
    background-color: var(--color-pure-white);
    border-radius: var(--border-radius-medium);
  }

  .progress-bar.dark {
    background-color: var(--color-navy);
  }

  .progress-bar::before {
    position: absolute;
    content: "";
    width: calc(var(--progress-width) - 8px);
    height: 8px;
    border-radius: var(--border-radius-small);
    left: 4px;
    background-color: var(--color-purple);
    transform: translateY(50%);
  }
</style>