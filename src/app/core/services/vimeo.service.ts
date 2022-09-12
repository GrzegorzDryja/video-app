import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '@services/data.service';
import { VimeoResponse } from '@models/vimeo.model'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  constructor(
    private http: HttpClient,
    private data: DataService  
  ) {}

  public fetchVideo(videoId: string): Subscription {
    return this.http
      .get(`${environment.vimeoApiURL}${videoId}`) 
      .subscribe(resp => this.data.addVimeoVideo(<VimeoResponse>resp));
  }
}
