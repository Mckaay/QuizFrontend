import { ref } from "vue";
import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  const darkMode = ref(false);

  function toggleTheme() {
    darkMode.value = !darkMode.value;
    document.documentElement.classList.toggle("dark");
  }

  return { toggleTheme, darkMode };
});
