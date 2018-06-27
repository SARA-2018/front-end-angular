import {SolutionInputDto} from './solution-input.dto';

export interface ExerciseInputDto {
    id: string;
    formulation?: string;
    solutions?: SolutionInputDto[];
}
