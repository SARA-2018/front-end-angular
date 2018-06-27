import { InteractionInputDto } from './interaction-input.dto';

export interface LessonInputDto {
    id: string;
    name: string;
    interactions: InteractionInputDto[];
}
