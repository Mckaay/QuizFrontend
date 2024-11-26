import { ref } from "vue";
import { defineStore } from "pinia";

export const useHeaderStore = defineStore("header", () => {
    const playing = ref(false)
    const quizTitle = ref("");
    const quizIcon = ref("");

    const getQuizName = () => {
        if (!playing) {
            return '';
        } else
            return quizTitle.value;
    }

    const getQuizIcon = () => {
        if (!playing) {
            return '';
        } else
            return quizIcon.value;
    }

    return {
        quizTitle,
        quizIcon,
        getQuizName,
        getQuizIcon
    };
});
