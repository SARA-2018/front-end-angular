import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { Video } from '../models/video.model';

@Injectable()
export class VideoService {

  static END_POINT = '/video';

  constructor(private httpService: HttpService) {
  }

  create(video: Video): Observable<any> {
    return this.httpService.successful().post(VideoService.END_POINT, video);
  }
}
