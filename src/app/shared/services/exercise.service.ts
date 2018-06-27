import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { CreateExerciseOutputDto } from '../../teacher/info-unit/dtos/create-exercise-output.dto';
import { Exercise } from '../models/exercise.model';
import { ExerciseInputDto } from '../dtos/exercise-input.dto';

@Injectable()
export class ExerciseService {

  static END_POINT = '/exercise';

  constructor(private httpService: HttpService) {
  }

  create(exercise: CreateExerciseOutputDto): Observable<any> {
    return this.httpService.successful().post(ExerciseService.END_POINT, exercise);
  }

  setContent(exercise: Exercise): Observable<any> {
    return this.httpService.successful().put(ExerciseService.END_POINT + '/' + exercise.getId(), exercise);
  }

  getById(id: string): Observable<ExerciseInputDto> {
    return this.httpService.get(ExerciseService.END_POINT + '/' + id);
  }
}
