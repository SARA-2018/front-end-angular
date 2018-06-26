import { Injectable } from '@angular/core';
import { HttpService } from '../core/http.service';
import { Video } from '../teacher/info-unit/models/video.model';
import { Observable } from 'rxjs/Observable';
import { VideoDto } from './dtos/video.dto';


@Injectable()
export class VideoService {

  static END_POINT = '/video';

  constructor(private httpService: HttpService) {
  }

  create(video: Video): Observable<any> {
    return this.httpService.successful().post(VideoService.END_POINT, video);
  }

  getById(id: string): Observable<VideoDto> {
    return this.httpService.get(VideoService.END_POINT + '/' + id);
  }
}
