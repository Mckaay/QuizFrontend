<script setup>
import Header from "@/components/Header.vue";
import QuizSelectionList from "@/components/Quiz/QuizSelectionList.vue";
import { useQuizStore } from "@/stores/quiz.js";
import { computed, onMounted, ref, watch } from "vue";
import { searchQuizzes } from "@/composables/api.js";

const quizStore = useQuizStore();

onMounted(async () => {
  // console.log('Hi');
  await quizStore.setQuizzesData();
});

const search = ref("");

watch(search, async () => {
  await quizStore.setQuizzesDataWithSearch(search.value);
});
</script>

<template>
  <div class="grid-container">
    <Header
      introText="Welcome to the"
      title="Quiz Game!"
      italicText="Pick a subject to get started"
    />
    <main>
      <input v-model="search" type="text" />
      <QuizSelectionList />
    </main>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  gap: var(--spacing-250);

  @media screen and (min-width: 1269px) {
    padding-top: var(--spacing-600);
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
