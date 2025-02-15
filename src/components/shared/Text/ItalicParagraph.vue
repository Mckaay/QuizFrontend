<script setup>
  import {useThemeStore} from "@/stores/theme.js";

  const { text } = defineProps(['text']);
  const themeStore = useThemeStore();
</script>

<template>
  <p class="italic-paragraph" :class="{ dark: themeStore.isDark }">{{ text }}</p>
</template>

<style scoped>
  .italic-paragraph {
    font-size: var(--font-size-87);
    font-style: italic;
    color: var(--color-grey-navy);
    margin-top: var(--spacing-100);
    line-height: 1.5;

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-125);
    }
  }

  .italic-paragraph.dark {
    color: var(--color-light-bluish);
  }
</style>