<script setup>
import QuizSelectionButton from "@/components/Quiz/QuizSelectionButton.vue";
import { onMounted, ref, watch } from "vue";
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
    <input
      v-model="search"
      class="search-bar"
      placeholder="Search Quizzes"
      type="text"
    />
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

.search-bar {
  padding: var(--spacing-25);
  padding-left: var(--spacing-75);
  border-radius: var(--border-radius-medium);
  outline: unset;
  border: unset;
  border: 2px solid rgb(75 85 99);

  @media (min-width: 768px) {
    padding: var(--spacing-75);
    padding-left: var(--spacing-100);
    border: 3px solid rgb(75 85 99);
  }
}

.search-bar:focus,
.search-bar:active {
  border: 2px solid rgb(63 131 248);

  @media (min-width: 768px) {
    border: 3px solid rgb(63 131 248);
  }
}
</style>
