import { Solution } from '../../../shared/models/solution.model';

export interface CreateExerciseOutputDto {

    formulation: string;
    solutions: Solution[];
    lessonId: string;
}
