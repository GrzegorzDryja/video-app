import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DEMO_VIDEOS } from '../models/demo.model';


import { Video, Videos } from '../models/video.model';
import { VimeoResponse } from '../models/vimeo.model';
import { YouTubeResponse } from '../models/youtube.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userVideosList: Videos = [];
  userVideosCounter = this.userVideosList.length;
  subject = new Subject<Videos>();
  love = false;

  constructor() { 
  }
  
  addYouTubeVideo(resp: YouTubeResponse){
    this.userVideosList.push(
      {
        appData: {
          platform: "youtube",
          id: ++this.userVideosCounter,
          favorite: false,
          date: new Date()
        },
        video: {...resp}
      }
    );
    this.subject.next(this.userVideosList)
    localStorage.setItem("video-app", JSON.stringify(this.userVideosList));
  }
  
  addVimeoVideo(resp: VimeoResponse){
    this.userVideosList.push(
      {
        appData: {
          platform: "vimeo",
          id: ++this.userVideosCounter,
          favorite: false,
          date: new Date()
        },
        video: {...resp}
      }
    );
    this.subject.next(this.userVideosList)
    localStorage.setItem("video-app", JSON.stringify(this.userVideosList));
  }

  loveVideo(id: number){
    let lovedVideo = this.userVideosList.find(video => video.appData.id == id);
        lovedVideo!.appData.favorite = !lovedVideo!.appData.favorite
    this.subject.next(this.userVideosList);
  }

  showFavorite(){
    this.love = !this.love;
    let lovedVideos = this.userVideosList.filter(video => video.appData.favorite === true);
    this.subject.next(this.love ? lovedVideos : this.userVideosList)
  }
  
  deleteVideo(id: number){
    this.userVideosList = this.userVideosList.filter(video => video.appData.id != id);
    this.subject.next(this.userVideosList);
  }

  deleteVideos(){
    this.userVideosList = [];
    this.subject.next(this.userVideosList);
  }

  sortByDate(){
    let sortedByDateVideos = this.userVideosList.reverse();   
    this.subject.next(sortedByDateVideos)
  }

  loadVideos(): Observable<Videos> {
    return this.subject.asObservable();
  }

  demoVideos(){
      this.userVideosList = DEMO_VIDEOS;
      this.subject.next(this.userVideosList);
  }

  getLocalStorage() {
    const local = localStorage.getItem("video-app");
    if (local){
      this.userVideosList = JSON.parse(local);
    }
    this.subject.next(this.userVideosList);
  }
}
