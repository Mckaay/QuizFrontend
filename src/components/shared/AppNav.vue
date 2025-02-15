<script setup>
import ThemeToggler from "@/components/shared/Button/ThemeToggler.vue";
import {useThemeStore} from "@/stores/theme.js";
import {useAuthStore} from "@/stores/auth.js";
import useAuth from "@/composables/auth.js";
import IconSunLight from "@/components/shared/icons/IconSunLight.vue";
import IconSunDark from "@/components/shared/icons/IconSunDark.vue";
import IconMoonLight from "@/components/shared/icons/IconMoonLight.vue";
import IconMoonDark from "@/components/shared/icons/IconMoonDark.vue";

const themeStore = useThemeStore();
const authStore = useAuthStore();
const authService = useAuth();
</script>

<template>
  <nav>
    <div class="container">
      <button
          v-show="authStore.authenticated"
          @click="authService.logout()"
          class="logout-button"
      >
        Logout
      </button>
      <div class="theme-container">
        <IconSunLight v-if="themeStore.isDark"/>
        <IconSunDark v-else/>
        <ThemeToggler/>
        <IconMoonLight v-if="themeStore.isDark"/>
        <IconMoonDark v-else/>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  padding-bottom: var(--spacing-100);
}

.container {
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

.theme-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-50);

  img {
    height: 16px;
    width: 16px;
  }

  @media screen and (min-width: 768px) {
    gap: var(--spacing-100);

    img {
      height: 24px;
      width: 24px;
    }
  }
}

.logout-button {
  margin-right: var(--spacing-200);
}
</style>
