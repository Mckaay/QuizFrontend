<template>
  test
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Quiz Admin Panel</h1>

    <div class="mb-8">
      <button @click="showAddQuizForm = true" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
        Add New Quiz
      </button>
    </div>

    <div v-if="quizzes.length > 0" class="space-y-4">
      <div v-for="quiz in quizzes" :key="quiz.id" class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2">{{ quiz.title }}</h2>
        <p class="text-gray-600 mb-2">Questions: {{ quiz.questions.length }}</p>
        <button @click="deleteQuiz(quiz.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">
          Delete
        </button>
      </div>
    </div>
    <p v-else class="text-gray-600">No quizzes available. Add a new quiz to get started.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const quizzes = ref([
  {
    id: 1,
    title: "General Knowledge Quiz",
    questions: [
      {
        text: "What is the capital of France?",
        answers: [
          { text: "London" },
          { text: "Berlin" },
          { text: "Paris" },
          { text: "Madrid" }
        ],
        correctAnswer: 2
      },
      {
        text: "Which planet is known as the Red Planet?",
        answers: [
          { text: "Venus" },
          { text: "Mars" },
          { text: "Jupiter" },
          { text: "Saturn" }
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: "Science Quiz",
    questions: [
      {
        text: "What is the chemical symbol for water?",
        answers: [
          { text: "Wa" },
          { text: "H2O" },
          { text: "O2" },
          { text: "CO2" }
        ],
        correctAnswer: 1
      }
    ]
  }
]);

const showAddQuizForm = ref(false);

const addQuiz = (newQuiz) => {
  quizzes.value.push({ ...newQuiz, id: Date.now() });
  showAddQuizForm.value = false;
};

const deleteQuiz = (quizId) => {
  quizzes.value = quizzes.value.filter(quiz => quiz.id !== quizId);
};
</script>