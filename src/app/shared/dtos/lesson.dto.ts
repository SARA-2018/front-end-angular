import { InteractionDto } from './interaction.dto';

export interface LessonDto {
    id: string;
    name: string;
    interactions: InteractionDto[];
}
