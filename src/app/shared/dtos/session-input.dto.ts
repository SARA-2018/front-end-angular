import { LessonInputDto } from './lesson-input.dto';

export interface SessionInputDto {
    id: string;
    name: string;
    lessons: LessonInputDto[];
}
