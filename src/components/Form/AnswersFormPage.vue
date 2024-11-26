<script setup>
import { computed, inject, ref } from "vue";
import AnswerList from "@/components/Form/AnswerList.vue";

const quiz = inject("quiz");
const { questionIndex } = defineProps(["questionIndex"]);

const answerIndex = ref(1);

const answer = ref({
  content: "",
  isCorrect: false,
});

const questionContent = computed(() => {
  if (questionIndex >= quiz.value.questions.length) {
    return "Out of bounds";
  }
  return quiz.value.questions[questionIndex].content;
});

const addAnswer = () => {
  quiz.value.questions[questionIndex].answers.push({
    index: answerIndex.value,
    content: answer.value.content,
    isCorrect: false,
  })
  answerIndex.value++;
}
</script>

<template>
  <div>
    <div class="current-question">
      Current Question: <br />
      {{ questionContent }}
    </div>
    <AnswerList :index="questionIndex" />
    <div class="input-answer-wrapper">
      <label for="answer">Answer</label>
      <input type="text" name="answer" v-model="answer.content"/>
      <div class="checkbox-wrapper">
        <label for="isCorrect">Is Correct:</label>
        <input type="checkbox" name="isCorrect" v-model="answer.isCorrect"/>
      </div>
      <button type="button" @click="addAnswer">Add answer</button>
    </div>
  </div>
</template>

<style>
.current-question {
  margin-bottom: var(--spacing-150);
}

.input-answer-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50);
}

.checkbox-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
