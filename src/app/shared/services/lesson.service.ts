import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../core/http.service';
import { CreateLessonOutputDto } from '../../teacher/info-unit/dtos/create-lesson-output.dto';
import { LessonInputDto } from '../dtos/lesson-input.dto';

@Injectable()
export class LessonService {

  static END_POINT = '/lesson';

  constructor(private httpService: HttpService) {}

  create(lesson: CreateLessonOutputDto): Observable<any> {
    return this.httpService.successful().post(LessonService.END_POINT, lesson);
  }

  getById(id: string): Observable<LessonInputDto> {
    return this.httpService.get(LessonService.END_POINT + '/' + id);
  }
}
