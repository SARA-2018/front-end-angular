import { Lesson } from './lesson.model';
import { Formation } from './formation.model';

export class Session extends Formation {
    private lessons: Lesson[];

    constructor(name: string) {
        super(name);
        this.lessons = [];
    }

    setLessons(lessons: Lesson[]): Session {
        this.lessons = lessons;
        return this;
    }

    getLessons(): Lesson[] {
        return this.lessons;
    }

    addLesson(lesson: Lesson) {
        this.lessons.push(lesson);
    }
}
