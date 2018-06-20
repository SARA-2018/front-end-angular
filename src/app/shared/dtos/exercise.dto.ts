import {SolutionDto} from './solution.dto';

export interface ExerciseDto {
    id: string;
    formulation?: string;
    solutions?: SolutionDto[];
}
