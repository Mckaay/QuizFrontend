<script setup>
import BaseHeader from "@/components/shared/Text/BaseHeader.vue";
import QuizSelectionList from "@/components/features/Quiz/QuizSelectionList.vue";
import {useQuizApi} from "@/composables/quizApi.js";
import {onMounted} from "vue";

const quizApi = useQuizApi();

onMounted(async () => {
  await quizApi.fetchQuizzes();
});
</script>

<template>
  <main>
    <BaseHeader
        introText="Welcome to the"
        title="Quiz Game!"
        italicText="Pick a subject to get started"
    />
    <section class="quiz-list">
      <input
          v-model="quizApi.state.searchQuery"
          class="search-bar"
          placeholder="Search Quizzes"
          type="text"
      />
      <QuizSelectionList :quizzes="quizApi.state.quizzes"/>
    </section>
  </main>
</template>

<style scoped>
main {
  display: grid;
  gap: var(--spacing-250);

  @media screen and (min-width: 1269px) {
    padding-top: var(--spacing-600);
    grid-template-columns: repeat(2, 1fr);
  }
}

.search-bar {
  padding: var(--spacing-25);
  padding-left: var(--spacing-75);
  border-radius: var(--border-radius-medium);
  outline: unset;
  border: unset;
  border: 2px solid rgb(75 85 99);
  width: 100%;
  margin-bottom: var(--spacing-100);
  text-align: center;

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
