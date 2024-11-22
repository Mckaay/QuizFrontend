import axios from "axios";

export function useQuiz() {
  const getQuizData = async () => {
    console.log("Getting quiz data");
    try {
      const response = await axios.get("/api/v1/quizzes");
      if (!response.data.data) {
        return [];
      }

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getSingleQuizData = async (id) => {
    console.log("Single Quiz Data");
    try {
      const response = await axios.get(`/api/v1/quizzes/${id}`);

      if (!response.data.data) {
        return [];
      }

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const searchQuizzes = async (query) => {
    console.log("Searching quizzes");
    try {
      const response = await axios.get(
        `/api/v1/quizzes/search?search=${query}`,
      );

      if (!response.data.data) {
        return [];
      }

      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  return { getQuizData, getSingleQuizData, searchQuizzes };
}
