import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { YOUTUBE_API_KEY } from '../core/credentials/credentials';
import { YouTubeResponse } from '../models/youtube.model';
import { DataService } from './data.service';


@Injectable({
    providedIn: 'root'
})
export class YoutubeService {

    constructor(
        private http: HttpClient,
        private data: DataService    
    ) {}

    fetchVideo(videoId: string) {

        return this.http
            .get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,statistics`)
            .subscribe(resp => this.data.addYouTubeVideo(<YouTubeResponse>resp));
    }
}
