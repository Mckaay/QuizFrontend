<script setup>
import Header from "@/components/Header.vue";
import QuizSelectionList from "@/components/Quiz/QuizSelectionList.vue";
</script>

<template>
  <div class="grid-container">
    <Header
      introText="Welcome to the"
      title="Quiz Game!"
      italicText="Pick a subject to get started"
    />
    <main>
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
