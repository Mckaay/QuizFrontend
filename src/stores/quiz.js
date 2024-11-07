import { ref } from 'vue';
import { defineStore } from 'pinia';
import quizzesData from "../database/data.json";

export const useQuizStore = defineStore('quiz', () => {
    const quizzesArray = quizzesData.quizzes;
    const currentQuizName = ref('');
    const currentQuizIcon = ref('');

    function setCurrentQuizName(name) {
        currentQuizName.value = name;
    }

    function setCurrentQuizIcon(iconPath) {
        currentQuizIcon.value = iconPath;
    }

    return { quizzesArray, currentQuizName, currentQuizIcon, setCurrentQuizName, setCurrentQuizIcon };
});
