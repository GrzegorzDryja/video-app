import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userVideosList: any;
  
  constructor() { }
  
  onAddVideo(videoResp: {}){
    //dodanie daty do obiektu
    this.userVideosList.push(videoResp)
  }
  
  onDeleteVideo(videoId: {}){
    //find index of videoId
    this.userVideosList.splice(+videoId)
  }

}
