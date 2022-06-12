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
  
  addVideo(resp: Video){
    this.userVideosList.push(
      {
        ...resp,
        userSetting: {
          favorite: false,
          date: new Date()
        }
      }
    );
    this.subject.next(this.userVideosList)
    localStorage.setItem("video-app", JSON.stringify(this.userVideosList));
  }
  
  loveVideo(id: string){
    let lovedVideo = this.userVideosList.find(i => i.items[0].id == id);
        lovedVideo!.userSetting.favorite = true
    this.subject.next(this.userVideosList);
  }

  showFavorite(){
    console.log("Pokazuję tylko ulubione")
  }
  
  deleteVideo(id: string){
    this.userVideosList = this.userVideosList.filter(i => i.items[0].id != id);
    this.subject.next(this.userVideosList);
  }

  deleteVideos(){
    this.userVideosList = [];
    this.subject.next(this.userVideosList); //I call this in every function, can I improve this?
  }

  loadVideos(): Observable<Videos> {
    return this.subject.asObservable();
  }

  getLocalStorage() {
    const local = localStorage.getItem("video-app");
    if (local){
      this.userVideosList = JSON.parse(local);
    }
    this.subject.next(this.userVideosList);
  }
}
