export class TrueOrFalseExercise {
    messageArray: string[];
    exercise: string;
    solutions: string[];

    constructor(json: string) {
        this.messageArray = messageArray;
        this.exercise = exercise;
        this.solutions = solutions;
    }

    generateExercise(): string[]{
        this.messageArray.push(this.exercise);
    }

}
