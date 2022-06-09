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
  
  onAddVideo(videoResp: Video){
    //Pamiętaj o dodanie daty do obiektu
    this.userVideosList.push(videoResp);
    this.subject.next(this.userVideosList)
  }
  
  onDeleteVideo(videoId: {}){
    //find index of videoId
    this.userVideosList.splice(+videoId)
  }

  loadVideos(): Observable<Videos> {
    return this.subject.asObservable();
  }
}
