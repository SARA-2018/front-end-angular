import { JustificationInputDto } from './justification-input.dto';

export interface SolutionInputDto {
    isCorrect: boolean;
    text: string;
    justifications: JustificationInputDto[];
}
