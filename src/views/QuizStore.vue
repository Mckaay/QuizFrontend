<script setup>
import IconChevronRight from "@/components/shared/icons/IconChevronRight.vue";
import IconChevronLeft from "@/components/shared/icons/IconChevronLeft.vue";
import { ref } from "vue";
import BaseButton from "@/components/shared/buttons/BaseButton.vue";
import SubmitButton from "@/components/shared/buttons/SubmitButton.vue";
import CreateQuizFirstStep from "@/components/features/quiz/CreateQuizFirstStep.vue";
import CreateQuizSecondStep from "@/components/features/quiz/CreateQuizSecondStep.vue";
import { useQuiz } from "@/composables/quiz.js";
import CreateQuizThirdStep from "@/components/features/quiz/CreateQuizThirdStep.vue";
import { useQuizApi } from "@/composables/quizApi.js";
import BaseErrorMessage from "@/components/shared/forms/BaseErrorMessage.vue";

const currentStep = ref(1);
const lastStep = 3;

const formRef = ref(null);
const quizApi = useQuizApi();
const quizService = useQuiz();

const goToTheNextStep = () => {
  const isFormValid = formRef?.value.checkValidity();
  if (!isFormValid) {
    formRef?.value.reportValidity();
    return;
  }

  if (currentStep.value === 1) {
    currentStep.value++;
    return;
  }

  if (currentStep.value === 2) {
    if (quizService.state.value.questions.length < 2) {
      quizService.state.value.error = "There must be at least 2 questions";
      return;
    }

    if (!quizService.isValidQuestions()) {
      quizService.state.value.error = "Question must have one correct answer";
      return;
    }

    quizService.state.value.error = "";
    currentStep.value++;
  }
};

const goToThePreviousStep = () => {
  quizService.state.value.error = "";
  currentStep.value--;
};

const saveQuiz = async () => {
  await quizApi.saveQuiz(quizService.state.value);
};
</script>

<template>
  <div
    class="max-w-4xl mx-auto mt-8 rounded-lg border bg-card text-card-foreground shadow-sm p-6"
  >
    <form ref="formRef" @submit.prevent="saveQuiz()">
      <CreateQuizFirstStep v-if="currentStep === 1" />
      <CreateQuizSecondStep v-else-if="currentStep === 2" />
      <CreateQuizThirdStep v-else />
      <BaseErrorMessage class="py-2" :text="quizService.state.value.error" />
      <div class="mt-8 flex justify-between">
        <BaseButton
          class="w-fit"
          :disabled="currentStep === 1"
          @click="goToThePreviousStep()"
        >
          <IconChevronLeft />
          Previous
        </BaseButton>
        <BaseButton
          v-if="currentStep !== 3"
          class="w-fit"
          :disabled="currentStep === lastStep"
          @click="goToTheNextStep()"
        >
          Next
          <IconChevronRight />
        </BaseButton>
        <SubmitButton v-else class="w-fit" type="submit">
          Create Quiz
        </SubmitButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
