import axios from "axios";
import { reactive, watch } from "vue";

const state = reactive({
  quizzes: [],
  parameters: {
    searchQuery: "",
    currentPage: 1,
    lastPage: 1,
  },
});

watch(
  () => [state.parameters.searchQuery, state.parameters.currentPage],
  async function () {
    await useQuizApi().fetchQuizzes();
  },
);

export function useQuizApi() {
  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/v1/quiz", {
        params: {
          page: state.parameters.currentPage,
          searchQuery: state.parameters.searchQuery,
        },
      });
      if (!response.data.data) {
        return [];
      }

      state.quizzes = response.data.data;
      state.parameters.lastPage = response.data.meta.last_page;
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

  const saveQuiz = async (quiz) => {
    try {
      const response = await axios.post(`/api/v1/quiz`, quiz);

      console.log(quiz);

      console.log(response);
    } catch (e) {
      console.log(e);
      console.log(quiz);
    }
  };

  const updateParameter = (key, value) => {
    if (key !== "currentPage") state.parameters.currentPage = 1;

    if (key === "currentPage") {
      state.parameters.currentPage = value;
      return;
    }

    state.parameters.searchQuery = value;
  };

  return { state, fetchQuizzes, getQuiz, saveQuiz, updateParameter };
}
