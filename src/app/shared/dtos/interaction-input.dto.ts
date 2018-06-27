import { ExerciseInputDto } from './exercise-input.dto';
import { VideoInputDto } from './video-input.dto';

export interface InteractionInputDto {

    exercise?: ExerciseInputDto;
    video?: VideoInputDto;
}
