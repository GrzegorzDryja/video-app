import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { YOUTUBE_API_KEY } from '../credentials/youtubekey.model';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http: HttpClient) { }

  fetchVideo(videoId: string) {

    return this.http
      .get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`)
      .subscribe(resp => console.log(resp));
  }
}
