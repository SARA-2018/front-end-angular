import { Injectable } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { CreateSessionOutputDto } from '../../teacher/info-unit/dtos/create-session-output.dto';
import { SessionInputDto } from '../dtos/session-input.dto';

@Injectable()
export class SessionService {

  static END_POINT = '/session';

  constructor(private httpService: HttpService) {
  }

  create(session: CreateSessionOutputDto): Observable<any> {
    return this.httpService.successful().post(SessionService.END_POINT, session);
  }

  getById(id: string): Observable<SessionInputDto> {
    return this.httpService.get(SessionService.END_POINT + '/' + id);
  }
}
