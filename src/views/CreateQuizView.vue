<script setup>
import { computed, provide, ref } from "vue";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";
import QuizFormPage from "@/components/Form/QuizFormPage.vue";
import QuestionsFormPage from "@/components/Form/QuestionsFormPage.vue";
import AnswersFormPage from "@/components/Form/AnswersFormPage.vue";

const quiz = ref({
  title: "",
  icon: "",
  questions: [

  ],
});
provide("quiz", quiz);

const errors = ref([]);
provide("errors", errors);

const questionsLength = computed(() => {
  return quiz.value.questions.length ?? 0;
});

const currentQuestionIndex = ref(0);
const currentPage = ref(1);

const goToPreviousPage = () => {
  if (currentPage.value > 3) {
    currentQuestionIndex.value--;
  }

  currentPage.value--;
};

const validateFirstPage = () => {
  const trimmedTitle = quiz.value.title.trim();

  if (trimmedTitle.length === 0 || trimmedTitle.length < 3) {
    errors.value.push({
      message: "Quiz title must have at least 3 characters",
    });
  }
};

const validateSecondPage = () => {
  if (quiz.value.questions.length < 4) {
    errors.value.push( {
      message: "Quiz must have at least 4 questions",
    })
  }

  if (quiz.value.questions.length > 15) {
    errors.value.push({
      message: "Quiz can have maximum 15 questions",
    })
  }
};

const validateAnswersToSingleQuestionPage = () => {

}

const goToNextPage = () => {
  errors.value = [];

  if (currentPage.value === 1) {
    validateFirstPage();
  }

  if (currentPage.value === 2) {
    validateSecondPage();
  }

  if (currentPage.value > 2) {
    validateAnswersToSingleQuestionPage()
  }

  if (errors.value.length !== 0) {
    return;
  }

  if (currentPage.value > 2) {
    currentQuestionIndex.value++;
  }

  currentPage.value++;
};

const submitForm = () => {
  console.log("Hi");
};
</script>

<template>
  <div class="form-wrapper">
    <form @submit.prevent="submitForm" method="POST" action="/api/v1/quizzes">
      <QuizFormPage v-if="currentPage === 1" />
      <QuestionsFormPage v-else-if="currentPage === 2"/>
      <AnswersFormPage :questionIndex="currentQuestionIndex" v-else/>
    </form>
    <ErrorMessage
      v-if="errors"
      v-for="error in errors"
      :message="error.message"
    />
    <div class="button-wrapper">
      <button v-if="currentPage !== 1" @click.prevent="goToPreviousPage">
        Previous
      </button>
      <button @click.stop="goToNextPage">Next</button>
    </div>
  </div>
</template>

<style></style>
