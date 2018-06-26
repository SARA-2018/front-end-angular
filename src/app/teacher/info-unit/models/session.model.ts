import { Lesson } from './lesson.model';
import { Formation } from './formation.model';

export class Session extends Formation {
    private name: string;
    private lessons: Lesson[];

    constructor(name: string) {
        super();
        this.name = name;
        this.lessons = [];
    }

    setName(name: string): Session {
        this.name = name;
        return this;
    }
    setLessons(lessons: Lesson[]): Session {
        this.lessons = lessons;
        return this;
    }

    getName(): string {
        return this.name;
    }
    getLessons(): Lesson[] {
        return this.lessons;
    }

    addLesson(lesson: Lesson) {
    this.lessons.push(lesson);
    }
}
