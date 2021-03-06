import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';
import { VimeoResponse } from '../models/vimeo.model'

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
      .get(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`) 
      .subscribe(resp => this.data.addVimeoVideo(<VimeoResponse>resp));
  }
}
