import { Solution } from '../../../shared/models/solution.model';

export interface CreateExerciseDto {

    formulation: string;
    solutions: Solution[];
    lessonId: string;
}
