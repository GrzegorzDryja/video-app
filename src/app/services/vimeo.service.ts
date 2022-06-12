import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { VIMEO_API_KEY } from '../credentials/vimeokey.model';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(
    private http: HttpClient,
    private data: DataService  
  ) {}

  fetchVideo(videoId: string) {

    return this.http
      .get(`https://api.vimeo.com/${videoId}/?access_token={${VIMEO_API_KEY}}&token_type=bearer&scope=public`) 
      .subscribe(resp => this.data.addVideo(<any>resp)); //JSON.parse(JSON.stringify(<Video>resp)))
  }
}
