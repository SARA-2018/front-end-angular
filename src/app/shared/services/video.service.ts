import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CreateVideoDto } from '../../teacher/info-unit/dtos/create-video.dto';
import { HttpService } from '../../core/http.service';
import { UpdateVideoDto } from '../../teacher/info-unit/dtos/update-video.dto';
import { VideoDto } from '../dtos/video.dto';

@Injectable()
export class VideoService {

  static END_POINT = '/video';

  constructor(private httpService: HttpService) { }

  create(video: CreateVideoDto): Observable<any> {
    return this.httpService.successful().post(VideoService.END_POINT, video);
  }

  setUrl(videoUrl: UpdateVideoDto, id: string): Observable<any> {
    return this.httpService.successful().put(VideoService.END_POINT + '/' + id, videoUrl);
  }

  getById(id: string): Observable<VideoDto> {
    return this.httpService.get(VideoService.END_POINT + '/' + id);
  }
}
