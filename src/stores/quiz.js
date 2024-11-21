import { ref } from "vue";
import { defineStore } from "pinia";
import {getQuizData, getSingleQuizData, searchQuizzes} from "@/composables/api.js";

export const useQuizStore = defineStore("quiz", () => {
  const arrayData = ref([]);
  const quizzesArray = arrayData.value;
  const currentQuiz = ref([]);
  const currentQuizName = ref("");
  const currentQuizIcon = ref("");

  function setCurrentQuizName(name) {
    currentQuizName.value = name;
  }

  async function setQuizzesData() {
    arrayData.value = await getQuizData();
  }

  async function setQuizzesDataWithSearch(query) {
    arrayData.value = await searchQuizzes(query);
  }

  async function setCurrentQuizData(id) {
    currentQuiz.value = await getSingleQuizData(id);
  }

  function getCurrentQuiz() {
    return currentQuiz.value;
  }

  function setCurrentQuizIcon(iconPath) {
    if (!iconPath) {
      return;
    }
    currentQuizIcon.value = iconPath;
  }

  return {
    setQuizzesDataWithSearch,
    currentQuiz,
    setCurrentQuizData,
    setQuizzesData,
    arrayData,
    quizzesArray,
    currentQuizName,
    currentQuizIcon,
    setCurrentQuizName,
    setCurrentQuizIcon,
  };
});
