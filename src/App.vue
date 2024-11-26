<script setup>
import Navbar from "@/components/Navbar.vue";
import { useThemeStore } from "@/stores/theme.js";
import { useUserStore } from "@/stores/auth.js";
import router from "@/router/index.js";

const themeStore = useThemeStore();
const authStore = useUserStore();

router.beforeEach((to) => {
  if (to.name === "login" && authStore.loggedIn) {
    router.push("/");
  }

  if (!to.meta.requiresAuth) {
    return;
  }

  if (!authStore.loggedIn) {
    router.push("/");
  }
});
</script>

<template>
  <div class="body-wrapper" :class="{ dark: themeStore.isDark }">
    <div class="container">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
div.dark {
  background-color: var(--color-dark-navy);
  color: var(--color-pure-white);
}

.body-wrapper {
  width: 100svw;
  height: 100svh;
  padding-top: var(--spacing-100);
  padding-inline: var(--spacing-150);
  background-color: var(--color-light-gray);
  color: var(--color-dark-navy);

  @media screen and (min-width: 768px) {
    padding-top: var(--spacing-250);
    padding-inline: var(--spacing-400);
  }

  @media screen and (min-width: 1268px) {
    padding-top: var(--spacing-600);
  }
}

.body-wrapper:has(.quiz-header-container) {
  @media screen and (min-width: 1268px) {
    padding-top: var(--spacing-530);
  }
}

.container {
  --desktop-container-max-width: 1160px;

  max-width: var(--desktop-container-max-width);
  max-height: 100svh;
  margin: auto;
}
</style>
