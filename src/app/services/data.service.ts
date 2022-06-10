import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Video, Videos } from '../models/youtube.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userVideosList: Videos = [];
  subject = new Subject<Videos>();

  constructor() { 
  }
  
  addVideo(videoResp: Video){
    videoResp.userSetting!.date = new Date();
    this.userVideosList.push(videoResp);
    this.subject.next(this.userVideosList)
  }

  loadVideos(): Observable<Videos> {
    return this.subject.asObservable();
  }
}
