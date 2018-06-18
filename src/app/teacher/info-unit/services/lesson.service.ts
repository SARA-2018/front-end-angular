import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Lesson } from '../models/lesson.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LessonService {

  static END_POINT = '/lesson';

  constructor(private httpService: HttpService) {
  }

  create(lesson: Lesson): Observable<any> {
    return this.httpService.successful().post(LessonService.END_POINT, lesson);
  }
}
