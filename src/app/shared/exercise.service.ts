import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';
import { CreateExerciseDto } from '../teacher/info-unit/dtos/create-exercise.dto';
import { Exercise } from './exercise.model';
import { ExerciseDto } from './dtos/exercise.dto';

@Injectable()
export class ExerciseService {

  static END_POINT = '/exercise';

  constructor(private httpService: HttpService) {
  }

  create(exercise: CreateExerciseDto): Observable<any> {
    return this.httpService.successful().post(ExerciseService.END_POINT, exercise);
  }

  setContent(exercise: Exercise): Observable<any> {
    return this.httpService.successful().put(ExerciseService.END_POINT + '/' + exercise.getId(), exercise);
  }

  getById(id: string): Observable<ExerciseDto> {
    return this.httpService.get(ExerciseService.END_POINT + '/' + id);
  }
}
