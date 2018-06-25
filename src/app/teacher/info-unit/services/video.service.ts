import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http.service';
import { Observable } from 'rxjs/Observable';
import { Video } from '../models/video.model';
import { VideoDto } from '../../../shared/dtos/video.dto';

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
