import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { YouTubeResponse } from '@models/youtube.model';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  public fetchVideo(videoId: string): Observable<YouTubeResponse> {
    return this.http.get<YouTubeResponse>(`${environment.youTubeApiURL}${videoId}${environment.youTubeApiKeyAndOptions}`);
  }
}
