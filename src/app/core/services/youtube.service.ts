import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { YouTubeResponse } from '@models/youtube.model';
import { DataService } from '@services/data.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient, private data: DataService) {}

  public fetchVideo(videoId: string): void {
    this.http
    .get(`${environment.youTubeApiURL}${videoId}${environment.youTubeApiKeyAndOptions}`)
    .pipe(
      map((responseData) => this.data.addYouTubeVideo(<YouTubeResponse>responseData)),
      catchError((errorRes) => errorRes)
    );
  }
}
