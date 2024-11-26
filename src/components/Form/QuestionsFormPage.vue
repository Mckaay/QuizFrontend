<script setup>
import { inject, ref } from "vue";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";
import QuestionList from "@/components/Form/QuestionList.vue";

const quiz = inject("quiz");
const errors = inject("errors");

let index = 0;
const question = ref({
  content: '',
});

const addQuestion = () => {
  errors.value = [];
  validateQuestion();

  if (errors.value.length !== 0) {
    return;
  }

  quiz.value.questions.push({
    index: index,
    content: question.value.content,
    answers: [],
  });

  question.value.content = '';
  index++;
};

const validateQuestion = () => {
  const trimmedString = question.value.content.trim();

  if (trimmedString.length < 8) {
    errors.value.push({
      message: 'Question must have at least 8 characters.'
    })
  }

  if (!trimmedString.endsWith('?')) {
    errors.value.push({
      message: 'Question must end with an question sign.'
    })
  }

  const unique = quiz.value.questions.some((element) => {
    return (
      element.content.trim().toLowerCase() ===
      trimmedString.toLowerCase()
    );
  });

  if (unique) {
    errors.value.push({
      message: 'Question in a single quiz must be unique.'
    })
  }
};
</script>

<template>
  <QuestionList :questions="quiz.questions"/>
  <div class="question-input-wrapper">
    <label for="content">Question</label>
    <input type="text" name="content" v-model="question.content" />
    <button type="button" @click="addQuestion">Add Question</button>
  </div>
</template>

<style>
.question-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-50);
}
</style>
