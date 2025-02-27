<script setup>
import ThemeToggle from "@/components/shared/ThemeToggle.vue";
import IconSettings from "@/components/shared/icons/IconSettings.vue";
import IconPlus from "@/components/shared/icons/IconPlus.vue";
import IconLogout from "@/components/shared/icons/IconLogout.vue";
import { useAuthStore } from "@/stores/auth.js";
import BaseButton from "@/components/shared/buttons/BaseButton.vue";

const authStore = useAuthStore();
</script>

<template>
  <nav class="border-b py-3">
    <div
      class="grid grid-cols-4 md:grid-cols-12 grid-rows-2 md:grid-rows-1 gap-2 mx-auto"
    >
      <RouterLink
        class="flex items-center"
        :to="{ name: 'home' }"
      >
        <h2
          class="text-lg font-semibold col-start-1 col-end-3 md:col-end-7 self-center"
        >
          Quiz Game
        </h2>
      </RouterLink>
      <ThemeToggle
        class="col-start-3 md:col-start-11 col-end-4 md:col-end-12 justify-self-end"
      />
      <button
        class="col-start-4 md:col-start-12 col-end-5 md:col-end-13 justify-self-end inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 w-10"
        @click="authStore.logout()"
      >
        <IconLogout />
        <span class="sr-only">Logout</span>
      </button>
      <RouterLink
        class="row-start-2 md:row-start-1 col-start-1 md:col-start-7 col-end-3 md:col-end-9"
        :to="{ name: 'create' }"
      >
        <BaseButton
          class="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <IconPlus />
          Create Quiz
        </BaseButton>
      </RouterLink>
      <BaseButton
        disabled
        class="row-start-2 md:row-start-1 col-start-3 md:col-start-9 col-end-5 md:col-end-11"
      >
        <IconSettings />
        Manage Quizzes
      </BaseButton>
    </div>
  </nav>
</template>

<style scoped></style>
