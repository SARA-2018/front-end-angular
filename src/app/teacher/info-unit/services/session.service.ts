import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { Session } from '../models/session.model';

@Injectable()
export class SessionService {

  static END_POINT = '/session';

  constructor(private httpService: HttpService) {
  }

  create(session: Session): Observable<any> {
    return this.httpService.successful().post(SessionService.END_POINT, session);
  }
}
