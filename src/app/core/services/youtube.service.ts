import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '@environments/environment';
import { YouTubeResponse } from '@models/youtube.model';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient, private data: DataService) {}

  public fetchVideo(videoId: string): Subscription {
    return this.http
      .get(`${environment.youTubeApiURL}${videoId}${environment.youTubeApiKeyAndOptions}`)
      .subscribe((resp) => this.data.addYouTubeVideo(<YouTubeResponse>resp));
  }
}
