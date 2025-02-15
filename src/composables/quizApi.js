import axios from "axios";
import {reactive, watch} from "vue";

const state = reactive({
  quizzes: [],
  searchQuery: "",
})

watch(
    () => [
      state.searchQuery
    ],
    async function () {
      await useQuizApi().searchQuizzes();
    },
);

export function useQuizApi() {
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/v1/quiz");
      if (!response.data.data) {
        return [];
      }

      state.quizzes = response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getQuiz = async (id) => {
    try {
      const response = await axios.get(`/api/v1/quiz/${id}`);

      if (!response.data.data) {
        return [];
      }

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const searchQuizzes = async () => {
    try {
      const response = await axios.get(
        `/api/v1/quiz/search?search=${state.searchQuery}`,
      );

      if (!response.data.data) {
        return [];
      }

      state.quizzes = response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const saveQuiz = async (quiz) => {
    try {
     const response = await axios.post(
          `/api/v1/quiz`, quiz,
      );

     console.log(quiz);

     console.log(response);
    } catch (e) {
      console.log(e);
      console.log(quiz);
    }
  }

  return { state, fetchQuizzes, getQuiz, searchQuizzes, saveQuiz };
}
