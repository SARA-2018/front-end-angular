import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { CreateSessionDto } from '../dtos/create-session.dto';
import { SessionDto } from '../../../shared/dtos/session.dto';

@Injectable()
export class SessionService {

  static END_POINT = '/session';

  constructor(private httpService: HttpService) {
  }

  create(session: CreateSessionDto): Observable<any> {
    return this.httpService.successful().post(SessionService.END_POINT, session);
  }

  getById(id: string): Observable<SessionDto> {
    return this.httpService.get(SessionService.END_POINT + '/' + id);
  }
}
