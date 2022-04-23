export interface Answer {
    id: string;
    label: string
    isCorrect: boolean;
    questionId : string;
}

export interface Question {
    id: string;
    label: string;
    quizId : string;
    answers: Answer[];
}
