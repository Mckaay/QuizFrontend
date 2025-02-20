<script setup>
import router from "@/router/index.js";


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

</template>

<style scoped>
</style>
