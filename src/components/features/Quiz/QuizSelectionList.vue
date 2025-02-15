<script setup>
import QuizSelectionListItem from "@/components/features/Quiz/QuizSelectionListItem.vue";

const props = defineProps({
  quizzes: {
    type: Array,
    default: () => [],
  }
})
</script>

<template>
  <div class="flex-container">
    <QuizSelectionListItem v-for="quiz in props.quizzes" :key="quiz.id" :quiz="quiz" />
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
