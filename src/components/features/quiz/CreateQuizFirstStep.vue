<script setup>
import BaseInput from "@/components/shared/forms/BaseInput.vue";
import { useQuiz } from "@/composables/quiz.js";

const quizService = useQuiz();
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Quiz Details</h2>
    <div class="space-y-4">
      <div>
        <BaseInput
          id="title"
          v-model="quizService.state.value.title"
          label="Quiz Title"
          placeholder="Enter quiz title"
          type="text"
          :required="true"
        />
      </div>
      <div>
        <BaseInput
          id="description"
          v-model="quizService.state.value.description"
          label="Description"
          placeholder="Enter quiz description"
          type="text"
          :required="true"
        />
      </div>
      <div>
        <BaseInput
          id="duration"
          v-model="quizService.state.value.time"
          label="Duration (minutes)"
          min="1"
          placeholder="Enter duration"
          type="number"
          :required="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
