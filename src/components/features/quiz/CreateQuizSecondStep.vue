<script setup>
import BaseInput from "@/components/shared/forms/BaseInput.vue";
import IconTrash from "@/components/shared/icons/IconTrash.vue";
import BaseButton from "@/components/shared/buttons/BaseButton.vue";
import IconPlus from "@/components/shared/icons/IconPlus.vue";
import { useQuiz } from "@/composables/quiz.js";

const quizService = useQuiz();

const setCorrectAnswer = (answers, correctAnswerIndex) => {
  answers.forEach((answer, index) => {
    answer.is_correct = index === correctAnswerIndex;
  });
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        Questions
      </h2>
      <BaseButton
        class="w-fit"
        @click="quizService.addQuestion()"
      >
        <IconPlus />
        Add Question
      </BaseButton>
    </div>
    <div class="space-y-8 max-h-[500px] overflow-y-auto">
      <div
        v-for="(question, questionIndex) in quizService.state.value.questions"
        :key="questionIndex"
        class="relative space-y-4 rounded-lg border p-4"
      >
        <button
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute right-2 top-2"
          @click="quizService.removeQuestion(questionIndex)"
        >
          <IconTrash />
        </button>
        <div>
          <BaseInput
            v-model="question.content"
            :label="`Question ${questionIndex + 1}`"
            placeholder="Enter your question"
            required
          />
        </div>
        <div class="space-y-3">
          <div
            v-for="(answer, answerIndex) in question.answers"
            :key="answerIndex"
            class="flex items-center space-x-2"
          >
            <input
              type="radio"
              :name="`correct_answer${questionIndex}`"
              :checked="answer.is_correct"
              @click="setCorrectAnswer(question.answers, answerIndex)"
            >
            <BaseInput
              v-model="answer.content"
              class="w-full"
              :placeholder="`Answer ${answerIndex + 1}`"
              required
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
