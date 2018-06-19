import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { Exercise } from './exercise.model';


@Injectable()
export class ExerciseService {

  static END_POINT = '/exercise';

  constructor(private httpService: HttpService) {
  }

  create(exercise: Exercise): Observable<any> {
    return this.httpService.successful().post(ExerciseService.END_POINT, exercise);
  }

  setContent(exercise: Exercise): Observable<any> {
      console.log(exercise);
    return this.httpService.successful().put(ExerciseService.END_POINT + '/' + exercise.getId() , exercise);
  }
}
