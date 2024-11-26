<script setup>
import { inject, ref } from "vue";

const quiz = inject("quiz");
</script>

<template>
  <div class="quiz-wrapper">
    <label for="title">Title</label>
    <input type="text" name="title" v-model="quiz.title" />
    <label for="icon">Icon</label>
    <input type="file" name="icon" />
  </div>
</template>

<style>
.quiz-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50);
}
</style>
