<script setup>
import {useThemeStore} from "@/stores/theme.js";
import {ref, watch} from "vue";

const themeStore = useThemeStore();
const checked = ref(themeStore.theme === 'dark');

watch(checked, () => {
  themeStore.toggleTheme();
});

</script>

<template>
  <input type="checkbox" v-model="checked">
</template>

<style scoped>
  input {
    position: relative;
    width: 32px;
    height: 20px;
    padding: var(--spacing-25);
    appearance: none;
    background-color: var(--color-purple);
    border-radius: var(--border-radius-large);
    cursor: pointer;

    @media screen and (min-width: 768px) {
      width: 48px;
      height: 28px;
    }
  }

  input::before {
    position: absolute;
    content: "";
    width: 12px;
    height: 12px;
    background: var(--color-pure-white);
    border-radius: 50%;

    @media screen and (min-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }

  input:checked::before  {
    right: var(--spacing-25);
  }
</style>