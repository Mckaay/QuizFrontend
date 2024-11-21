<script setup>
  import {useThemeStore} from "@/stores/theme.js";

  const props = defineProps(['message'])
  const themeStore = useThemeStore();
</script>

<template>
  <div class="error-message" :class="{ dark: themeStore.isDark }">{{ props.message }}</div>
</template>

<style scoped>
  .error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-50);
    font-size: var(--font-size-110);
    color: var(--color-red);
    line-height: 1;
    text-align: center;

    @media screen and (min-width: 768px) {
      font-size: var(--font-size-150);
    }
  }

  .error-message.dark {
    color: var(--color-pure-white);
  }

  .error-message::before {
    display: block;
    content: "";
    background-size: 32px;
    background: url(../../assets/images/icon-incorrect.svg);
    max-width: 32px;
    max-height: 32px;
    min-width: 40px;
    min-height: 40px;
  }
</style>