import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') ?? 'light');

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value);
  }

  const isDark = computed(() => theme.value === 'dark');

  return { theme, toggleTheme, isDark }
  }
)