import axios from "axios";

export async function getQuizData() {
  try {
    const response = await axios.get("/api/v1/quizzes");

    if (!response.data.data) {
      return [];
    }

    return response.data.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
}

export async function getSingleQuizData(id) {
  try {
    const response = await axios.get(`/api/v1/quizzes/${id}`);

    if (!response.data.data) {
      return [];
    }

    return response.data.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
}

export async function searchQuizzes(query) {
  try {
    const response = await axios.get(`/api/v1/quizzes/search?search=${query}`);

    if (!response.data.data) {
      return [];
    }

    return response.data.data;
  } catch (e) {
    console.log(e.response.data.message);
  }
}
