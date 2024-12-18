<script setup>
import RoundedCheckbox from "@/components/Button/RoundedCheckbox.vue";
import { useThemeStore } from "@/stores/theme.js";
import { computed, ref } from "vue";
import QuizHeader from "@/components/Quiz/QuizHeader.vue";
import { useHeaderStore } from "@/stores/header.js";
import { useUserStore } from "@/stores/auth.js";

const themeStore = useThemeStore();
const headerStore = useHeaderStore();
const userStore = useUserStore();

const containerJustifyContent = computed(() => {
  return headerStore.getQuizName() !== "" ? "space-between" : "flex-end";
});
</script>

<template>
  <nav>
    <div class="container" :style="{ justifyContent: containerJustifyContent }">
      <div
        v-if="headerStore.getQuizName() !== ''"
        class="quiz-header-container"
      >
        <QuizHeader
          :quizIcon="headerStore.getQuizIcon()"
          :quizTitle="headerStore.getQuizName()"
        />
      </div>
      <button
        v-show="userStore.loggedIn"
        @click="userStore.logout()"
        class="logout-button"
      >
        Logout
      </button>
      <div class="theme-container">
        <img
          v-if="themeStore.isDark"
          src="../assets/images/icon-sun-light.svg"
          height="14"
          width="16"
          alt="sun-icon"
        />
        <img
          v-else
          src="../assets/images/icon-sun-dark.svg"
          height="16"
          width="16"
          alt="sun-icon"
        />
        <RoundedCheckbox />
        <img
          v-if="themeStore.isDark"
          src="../assets/images/icon-moon-light.svg"
          height="16"
          width="16"
          alt="sun-icon"
        />
        <img
          v-else
          src="../assets/images/icon-moon-dark.svg"
          height="16"
          width="16"
          alt="sun-icon"
        />
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
  justify-content: space-between;
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

.quiz-header-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-100);
}

.logout-button {
  margin-right: var(--spacing-200);
}
</style>
