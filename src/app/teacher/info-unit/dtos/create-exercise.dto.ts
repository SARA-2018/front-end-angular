import { Solution } from '../../shared/solution.model';

export interface CreateExerciseDto {

    formulation: string;
    solutions: Solution[];
    lessonId: string;
}
