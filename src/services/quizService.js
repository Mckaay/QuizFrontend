export default class Quiz {
    constructor(quizData) {
        this.quizData = quizData;
        this.questionIndex = 0;
        this.score = 0;
        this.questions = quizData.questions;
        this.quizTitle = quizData.title;
        this.quizIcon = quizData.icon;
    }

    get currentQuestion() {
        return this.questions[this.questionIndex].question;
    }

    get currentOptions() {
        return this.questions[this.questionIndex].options;
    }

    get totalQuestions () {
        return this.questions.length;
    }

    get correctAnswer () {
        return this.questions[this.questionIndex].answer;
    }

    get correctAnswerIndex () {
        return this.questions[this.questionIndex].options.findIndex((option) => option === this.correctAnswer);
    }

    incrementScore () {
        this.score++;
    }

    incrementQuestionIndex () {
        this.questionIndex++;
    }

    checkAnswer (answer) {
        return this.correctAnswer === answer;
    }

    checkAnswerByIndex (index) {
        return this.correctAnswerIndex === parseInt(index);
    }

    checkIfQuizShouldEnd () {
        return this.questionIndex >= this.totalQuestions;
    }

    checkIfLastQuestion () {
        return this.questionIndex === (this.totalQuestions -1);
    }

    restartQuiz () {
        this.questionIndex = 0;
    }

}