<script setup>
import QuizSelectionButton from "@/components/quizComponents/QuizSelectionButton.vue";
import fileQuizzes from "../../database/data.json";
import {computed} from "vue";

const quizzes = computed(() => {
  return fileQuizzes.quizzes;
})
</script>

<template>
  <div class="flex-container">
      <QuizSelectionButton v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz"/>
  </div>
</template>

<style scoped>
  .flex-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-75);

    @media (min-width: 768px) {
      gap: var(--spacing-150);

    }
  }
</style>