<script setup>
import IconSun from "@/components/shared/icons/IconSun.vue";
import IconMoon from "@/components/shared/icons/IconMoon.vue";
import { useThemeStore } from "@/stores/theme.js";

const themeStore = useThemeStore();
</script>

<template>
  <button
    class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    @click="themeStore.toggleTheme()"
  >
    <IconSun />
    <IconMoon />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
