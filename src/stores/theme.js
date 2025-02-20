import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useThemeStore = defineStore('theme', () => {
        const darkMode = ref(Boolean(localStorage.getItem('darkMode')) ?? false);

        function toggleTheme() {
            darkMode.value = !darkMode.value;
            localStorage.setItem('darkMode', darkMode.value);
        }

        return {toggleTheme, darkMode}
    }
)