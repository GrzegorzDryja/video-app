import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';

import { Videos } from '@models/video.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private love = false;

  public userVideosList: Videos = [];
  public subject = new Subject<Videos>();

  constructor(private localStorageService: LocalStorageService, private store: Store) {}

  public showFavorite(): void {
    this.love = !this.love;
    const lovedVideos = this.userVideosList.filter((video) => video.favorite);
    this.subject.next(this.love ? lovedVideos : this.userVideosList);
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
  
  public checkIfVideoIdIsOnTheList(id: string) {
    return this.userVideosList.length === 0 ? true : this.userVideosList.every((el) => el.videoId !== id);
  }
}
