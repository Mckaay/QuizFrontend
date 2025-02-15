import {reactive} from "vue";

import { defineStore } from 'pinia'

export const useQuizFormStore = defineStore('quizForm', () => {

        const quiz = reactive({
            title: "",
            questions: [],
        });

        return { quiz };
    }
)