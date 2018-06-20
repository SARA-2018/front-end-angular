import { ExerciseDto } from './exercise.dto';
import { VideoDto } from './video.dto';

export interface InteractionDto {

    exerciseDto?: ExerciseDto;
    videoDto?: VideoDto;
}
