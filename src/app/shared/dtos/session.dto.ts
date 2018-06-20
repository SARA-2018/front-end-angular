import { LessonDto } from './lesson.dto';

export interface SessionDto {
    id: string;
    name: string;
    lessons: LessonDto[];
}
