<script setup>
import { reactive, ref, computed } from "vue";
import { useQuizApi } from "@/composables/quizApi.js";
import { checkIfObjectHasEmptyProperties } from "@/services/helpers.js";
import ErrorMessage from "@/components/Form/ErrorMessage.vue";
import router from "@/router/index.js";

const quizApi = useQuizApi();

const quiz = reactive({
  title: "",
  questions: []
});

const currentStep = ref(1);
const lastStep = ref(3);
const errors = reactive({
  title: '',
  questions: '',
});

const isFirstStep = computed(() => currentStep.value === 1);
const isLastStep = computed(() => currentStep.value === lastStep.value);

const clearQuizData = () => {
  quiz.title = "";
  quiz.questions = [];
};

const clearErrors = () => {
  errors.title = '';
  errors.questions = '';
};

const goToPreviousStep = () => {
  if (!isFirstStep.value) {
    clearErrors();
    currentStep.value--;
  }
};

const goToNextStep = () => {
  if (isLastStep.value) return;

  const stepValidations = {
    1: validateFirstStep,
    2: validateSecondStep
  };

  const validateStep = stepValidations[currentStep.value];
  if (validateStep) validateStep();

  if (checkIfObjectHasEmptyProperties(errors)) {
    currentStep.value++;
  }
};

const addQuestionToQuiz = () => {
  quiz.questions.push({
    content: '',
    answers: [],
    isExpanded: true
  });
};

const addAnswerToQuestion = (question) => {
  if (!question.answers) {
    question.answers = [];
  }
  question.answers.push({
    content: '',
    is_correct: false
  });
};

const setCorrectAnswer = (question, index) => {
  question.answers.forEach((answer, i) => {
    answer.is_correct = i === index;
  });
};

const toggleQuestion = (question) => {
  question.isExpanded = !question.isExpanded;
};

const saveQuiz = async () => {
  if (checkIfObjectHasEmptyProperties(errors)) {
    await quizApi.saveQuiz(quiz);
    clearQuizData();
    clearErrors();
    await router.push('/');
  }
};

const validateFirstStep = () => {
  errors.title = quiz.title.length <= 3
      ? 'Title is required and must have at least 3 characters'
      : '';
};

const validateSecondStep = () => {
  if (quiz.questions.length < 2) {
    errors.questions = 'There must be at least 2 questions in a quiz';
    return;
  }

  if (quiz.questions.some(question => question?.content?.length < 5)) {
    errors.questions = 'Every Question must have at least 5 characters';
    return;
  }

  if (quiz.questions.some(question => question.answers.length < 4)) {
    errors.questions = 'Every Question must have 4 answers';
    return;
  }

  if (quiz.questions.some(question => !question.answers.some(answer => answer.is_correct))) {
    errors.questions = 'Every Question must have a correct answer selected';
    return;
  }

  errors.questions = '';
};
</script>

<template>
  <div class="wrapper">
    <form @submit.prevent="saveQuiz">
      <div class="step" v-if="currentStep === 1">
        <h2>Quiz Details</h2>
        <div class="form-group">
          <label for="title">Quiz Title</label>
          <input id="title" type="text" name="title" v-model="quiz.title"/>
          <ErrorMessage v-if="errors.title" :message="errors.title"/>
        </div>
      </div>

      <div class="step questions-step" v-if="currentStep === 2">
        <h2>Add Questions</h2>
        <ErrorMessage v-if="errors.questions" :message="errors.questions"/>
        <div class="questions-container">
          <div class="question" v-for="(question, questionIndex) in quiz.questions" :key="questionIndex">
            <div class="question-header">
              <button type="button" @click="toggleQuestion(question)" class="toggle-btn">
                {{ question.isExpanded ? '▼' : '►' }}
              </button>
              <label>Question {{ questionIndex + 1 }}</label>
              <button type="button" @click="quiz.questions.splice(questionIndex, 1);" class="remove-btn">X</button>
            </div>
            <div v-if="question.isExpanded" class="question-content">
              <div class="input-wrapper">
                <input type="text" v-model="question.content" required/>
              </div>
              <div class="answers" v-for="(answer, answerIndex) in question.answers" :key="answerIndex">
                <div class="answer-wrapper">
                  <label>
                    <input
                        type="checkbox"
                        :checked="answer.is_correct"
                        @change="setCorrectAnswer(question, answerIndex)"
                    />
                    Answer {{ answerIndex + 1 }}
                  </label>
                  <div class="input-wrapper">
                    <input v-model="answer.content" type="text" required>
                    <button type="button" @click="question.answers.splice(answerIndex, 1);" class="remove-btn">X</button>
                  </div>
                </div>
              </div>
              <button type="button" @click="addAnswerToQuestion(question)" class="add-btn">Add Answer</button>
            </div>
          </div>
        </div>
        <button type="button" @click="addQuestionToQuiz" class="add-btn">Add Question</button>
      </div>

      <div class="step" v-if="currentStep === 3">
        <h2>Review</h2>
        <h3>{{ quiz.title }}</h3>
        <div v-for="(question, questionIndex) in quiz.questions" :key="questionIndex" class="review-question">
          <p class="question-content">{{ questionIndex + 1 }}. {{ question.content }}</p>
          <ul>
            <li v-for="(answer, answerIndex) in question.answers" :key="answerIndex"
                :class="{ 'correct-answer': answer.is_correct }">
              {{ answer.content }}
              <span v-if="answer.is_correct" class="correct-label">(Correct)</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="button-wrapper">
        <button type="button" @click="goToPreviousStep" :disabled="isFirstStep" class="nav-btn">Back</button>
        <button type="button" @click="goToNextStep" v-if="!isLastStep" class="nav-btn">Next</button>
        <button type="submit" v-if="isLastStep" class="submit-btn">Submit</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #444;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.input-wrapper input {
  flex-grow: 1;
  margin-right: 10px;
}

.remove-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.add-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
}

.questions-step {
  max-height: 500px;
  overflow-y: auto;
}

.questions-container {
  margin-bottom: 20px;
}

.question {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
}

.question-content {
  margin-top: 10px;
}

.answer-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.answer-wrapper label {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.answer-wrapper input[type="checkbox"] {
  margin-right: 5px;
}

.review-question {
  margin-bottom: 20px;
}

.question-content {
  font-weight: bold;
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

.correct-answer {
  font-weight: bold;
}

.correct-label {
  color: #4CAF50;
  margin-left: 5px;
}

.button-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.nav-btn, .submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.nav-btn {
  background-color: #f0f0f0;
  color: #333;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.nav-btn:hover, .submit-btn:hover {
  opacity: 0.9;
}
</style>