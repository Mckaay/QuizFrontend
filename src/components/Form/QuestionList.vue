<script setup>
import { inject } from "vue";

const quiz = inject("quiz");

const removeQuestion = (index) => {
  console.log(index);
  quiz.value.questions = quiz.value.questions.filter((question) => {
    return question.index !== index;
  })

  console.log(quiz.value.questions);
};
</script>

<template>
  <div class="added-questions-section">
    <div v-if="quiz.questions.length">Question List:</div>
    <div
      class="questions-list"
      v-if="quiz.questions.length > 0"
      v-for="question in quiz.questions"
      :key="question.index"
    >
      <div class="question-wrapper">
        <div class="question-content">{{ question.content }}</div>
        <div class="remove-button" @click.prevent="removeQuestion(question.index)">X</div>
      </div>
    </div>
  </div>
</template>

<style>
.question-wrapper {
  display: flex;
  justify-content: space-between;
}

.remove-button {
  height: 20px;
  width: 20px;
}

.remove-button:hover {
  cursor: pointer;
  color: red;
}
</style>
