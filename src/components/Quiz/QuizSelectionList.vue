<script setup>
import QuizSelectionButton from "@/components/Quiz/QuizSelectionButton.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useQuizStore } from "@/stores/quiz.js";
import { useQuiz } from "@/composables/quizzes.js";

const quizzes = ref([]);
const quizApi = useQuiz();

onMounted(async () => {
  quizzes.value = await quizApi.getQuizData();
});

const search = ref("");
watch(search, async () => {
  quizzes.value = await quizApi.searchQuizzes(search.value);
});
</script>

<template>
  <div class="flex-container">
    <input v-model="search" type="text" />
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
