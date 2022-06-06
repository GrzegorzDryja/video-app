import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { YOUTUBE_API_KEY } from '../credentials/youtubekey.model';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  fetchVideo(id: string) {
    console.log("wysyłam")

    return this.http
      .get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails,statistics,status`)
      .subscribe(resp => console.log(resp));
  }
}
