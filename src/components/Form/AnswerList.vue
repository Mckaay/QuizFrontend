<script setup>
import { computed, inject } from "vue";

const quiz = inject("quiz");
const { index } = defineProps(["index"]);

const answers = computed(() => {
  if (quiz.value.questions[index].answers) {
    return quiz.value.questions[index].answers;
  } else {
    return null;
  }
});
</script>

<template>
  <div v-if="answers.length" class="added-answers-section">
    <div>Answer List:</div>
    <div class="answer-list" v-for="answer in answers" :key="answer.index">
      <div>{{ answer.content }}</div>
    </div>
  </div>
</template>

<style>
.answer-wrapper {
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
