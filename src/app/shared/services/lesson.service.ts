import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { CreateLessonDto } from '../../teacher/info-unit/dtos/create-lesson.dto';
import { LessonDto } from '../dtos/lesson.dto';

@Injectable()
export class LessonService {

  static END_POINT = '/lesson';

  constructor(private httpService: HttpService) {}

  create(lesson: CreateLessonDto): Observable<any> {
    return this.httpService.successful().post(LessonService.END_POINT, lesson);
  }

  getById(id: string): Observable<LessonDto> {
    return this.httpService.get(LessonService.END_POINT + '/' + id);
  }
}
