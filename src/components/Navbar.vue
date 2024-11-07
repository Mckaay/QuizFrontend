<script setup>
import RoundedCheckbox from "@/components/buttons/RoundedCheckbox.vue";
import {useThemeStore} from "@/stores/theme.js";
import {useQuizStore} from "@/stores/quiz.js";
import {computed, watch} from "vue";
import {useRouter} from "vue-router";
import QuizHeader from "@/components/quizComponents/QuizHeader.vue";

const themeStore = useThemeStore();
const quizStore = useQuizStore();
const router = useRouter();

watch(
    () => router.currentRoute.value.path,
    (currentPath) => {
      if (!currentPath.startsWith('/quiz/')) {
        quizStore.setCurrentQuizName('');
        quizStore.setCurrentQuizIcon('');
      }
    }
);

const containerJustifyContent = computed(() => {
  return quizStore.currentQuizName !== '' ? 'space-between' : 'flex-end';
});
</script>

<template>
  <nav>
    <div class="container" :style="{justifyContent: containerJustifyContent }">
      <div v-if="quizStore.currentQuizName !== ''" class="quiz-header-container">
        <QuizHeader :quizIcon="quizStore.currentQuizIcon" :quizTitle="quizStore.currentQuizName"/>
      </div>
      <div class="theme-container">
        <img v-if="themeStore.isDark" src="../assets/images/icon-sun-light.svg" height="14" width="16" alt="sun-icon">
        <img v-else src="../assets/images/icon-sun-dark.svg" height="16" width="16" alt="sun-icon">
        <RoundedCheckbox/>
        <img v-if="themeStore.isDark" src="../assets/images/icon-moon-light.svg" height="16" width="16" alt="sun-icon">
        <img v-else src="../assets/images/icon-moon-dark.svg" height="16" width="16" alt="sun-icon">
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
</style>