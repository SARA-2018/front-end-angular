import { ExerciseDto } from './exercise.dto';
import { VideoDto } from './video.dto';

export interface InteractionDto {

    exercise?: ExerciseDto;
    video?: VideoDto;
}
