import { JustificationDto } from './justification.dto';

export interface SolutionDto {
    isCorrect: boolean;
    text: string;
    justifications: JustificationDto[];
}
