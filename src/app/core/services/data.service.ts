import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as VideosActions from '@core/store/videos.actions';

import { Video, Videos } from '@models/video.model';
import { VimeoResponse } from '@models/vimeo.model';
import { YouTubeResponse } from '@models/youtube.model';
import { VideoPlatform } from '@shared/video-platform.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private lastDeletedVideo!: Video;
  private love = false;
  private sortByDateSwitch = true;

  public userVideosList: Videos = [];
  public subject = new Subject<Videos>();

  constructor(private localStorageService: LocalStorageService, private store: Store) {}

  private updateSubjectAndLocalStorage(): void {
    // this.subject.next(this.userVideosList);
    // this.localStorageService.saveToLocalStorage(this.userVideosList);
    return
  }

  public loveVideo(id: string): void {
    const lovedVideo = this.userVideosList.find((video) => video.videoId === id);
    lovedVideo!.favorite = !lovedVideo!.favorite;
    
    this.store.dispatch(VideosActions.loveVideoSucces({ videos: this.userVideosList }))
 
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public showFavorite(): void {
    this.love = !this.love;
    const lovedVideos = this.userVideosList.filter((video) => video.favorite);
    this.subject.next(this.love ? lovedVideos : this.userVideosList);
  }

  // public deleteVideo(videoId: string): void {
  //   const lastDeletedVideoIndex = this.userVideosList.findIndex((video) => video.videoId === videoId);
  //   this.lastDeletedVideo = this.userVideosList[lastDeletedVideoIndex];
  //   this.userVideosList.splice(lastDeletedVideoIndex, 1)
  //   this.updateSubjectAndLocalStorage();
  // }

  public deleteVideos(): void {
    this.userVideosList = [];
    this.updateSubjectAndLocalStorage();
  }

  public sortByDate(dateSortSwitch: boolean): void {
    this.sortByDateSwitch = dateSortSwitch;
    this.sortByDateSwitch
      ? this.userVideosList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : this.userVideosList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.updateSubjectAndLocalStorage();
  }

  public loadVideos(): Observable<Videos> {
    return this.subject.asObservable();
  }

  public demoVideos(): void {
    this.subject.next(this.userVideosList);
  }

  public getLocalStorage(): void {
    const local = this.localStorageService.getLocalStorage();
    if (local) {
      this.userVideosList = JSON.parse(local);
    }
    this.subject.next(this.userVideosList);
  }

  public undoVideo(): void {
    this.userVideosList.push(this.lastDeletedVideo!);
    this.sortByDate(this.sortByDateSwitch);
    this.updateSubjectAndLocalStorage();
  }
  
  public checkIfVideoIdIsOnTheList(id: string) {
    return this.userVideosList.length === 0 ? true : this.userVideosList.every((el) => el.videoId !== id);
  }
}
