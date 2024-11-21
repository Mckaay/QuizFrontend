export default class Quiz {
    constructor(quizData) {
        this.quizData = quizData;
        this.questionIndex = 0;
        this.score = 0;
        this.questions = this.quizData.questions ?? [];
        this.quizTitle = this.quizData.title ?? '';
        this.quizIcon = this.quizData.icon ?? '';
    }

    get currentQuestion() {
        return this.questions[this.questionIndex]?.content;
    }

    get currentOptions() {
        return this.questions[this.questionIndex]?.answers;
    }

    get totalQuestions () {
        return this.questions.length ?? 0;
    }

    get correctAnswerIndex () {
        return this.questions[this.questionIndex].answers.findIndex((answer) => answer.is_correct);
    }

    incrementScore () {
        this.score++;
    }

    incrementQuestionIndex () {
        this.questionIndex++;
    }

    checkAnswer (answer) {
        return answer.is_correct;
    }

    checkAnswerByIndex (index) {
        return index == this.correctAnswerIndex;
    }

    checkIfQuizShouldEnd () {
        return this.questionIndex >= this.totalQuestions ?? false;
    }

    checkIfLastQuestion () {
        return this.questionIndex === (this.totalQuestions -1);
    }

    restartQuiz () {
        this.questionIndex = 0;
    }

}