import { LessonDto } from './lesson.dto';

export interface SessionDto {
    name: string;
    lessons: LessonDto[];
}
