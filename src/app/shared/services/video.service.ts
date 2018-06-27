import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CreateVideoOutputDto } from '../../teacher/info-unit/dtos/create-video-output.dto';
import { HttpService } from '../../core/http.service';
import { VideoInputDto } from '../dtos/video-input.dto';
import { Video } from '../models/video.model';

@Injectable()
export class VideoService {

  static END_POINT = '/video';

  constructor(private httpService: HttpService) { }

  create(video: CreateVideoOutputDto): Observable<any> {
    return this.httpService.successful().post(VideoService.END_POINT, video);
  }

  update(video: Video): Observable<any> {
    return this.httpService.successful().put(VideoService.END_POINT + '/' + video.getId(), video);
  }

  getById(id: string): Observable<VideoInputDto> {
    return this.httpService.get(VideoService.END_POINT + '/' + id);
  }
}
