<script setup>
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();

router.beforeEach((to) => {
  if (to.name === "login" && authStore.authenticated) {
    router.push("/");
  }

  if (!to.meta.requiresAuth) {
    return;
  }

  if (!authStore.authenticated) {
    router.push("/");
  }
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="min-h-screen container mx-auto px-4 py-8">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
