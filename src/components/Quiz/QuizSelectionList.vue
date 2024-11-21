<script setup>
import QuizSelectionButton from "@/components/Quiz/QuizSelectionButton.vue";
import { computed, onMounted } from "vue";
import { useQuizStore } from "@/stores/quiz.js";

const quizStore = useQuizStore();
const quizzes = computed(() => {
  return quizStore.arrayData;
});

onMounted(() => {
  quizStore.setQuizzesData();
});
</script>

<template>
  <div class="flex-container">
    <QuizSelectionButton v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
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
