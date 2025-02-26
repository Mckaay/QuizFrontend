<script setup>
import ThemeToggle from "@/components/shared/ThemeToggle.vue";
</script>

<template>
  <nav class="border-b">
    <div class="flex h-16 items-center justify-between mx-auto">
      <RouterLink class="flex items-center" :to="{ name: 'home' }">
        <h2
          class="text-lg font-semibold col-start-1 col-end-3 md:col-end-7 self-center"
        >
          Quiz Game
        </h2>
      </RouterLink>
      <ThemeToggle />
    </div>
  </nav>
</template>

<style scoped></style>
