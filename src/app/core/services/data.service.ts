import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Videos } from '@models/video.model';
import { VimeoResponse } from '@models/vimeo.model';
import { YouTubeResponse } from '@models/youtube.model';
import { VideoPlatform } from '@shared/video-platform.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public userVideosList: Videos = [];
  public subject = new Subject<Videos>();

  private userVideosCounter = this.userVideosList.length;
  private love = false;

  constructor(private localStorageService: LocalStorageService) {}

  public addYouTubeVideo(resp: YouTubeResponse): void {
    this.userVideosList.push({
      platform: VideoPlatform.youtube,
      id: ++this.userVideosCounter,
      favorite: false,
      date: new Date(),
      videoId: resp.items[0].id,
      title: resp.items[0].snippet.title,
      img: resp.items[0].snippet.thumbnails.default.url,
      viewCount: resp.items[0].statistics.viewCount,
    });
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public addVimeoVideo(resp: VimeoResponse): void {
    this.userVideosList.push({
      platform: VideoPlatform.vimeo,
      id: ++this.userVideosCounter,
      favorite: false,
      date: new Date(),
      videoId: resp.video_id.toString(),
      title: resp.title,
      img: resp.thumbnail_url,
      viewCount: 'Brak danych',
    });
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public loveVideo(id: string): void {
    const lovedVideo = this.userVideosList.find((video) => video.videoId === id);
    lovedVideo!.favorite = !lovedVideo!.favorite;
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public showFavorite(): void {
    this.love = !this.love;
    const lovedVideos = this.userVideosList.filter((video) => video.favorite);
    this.subject.next(this.love ? lovedVideos : this.userVideosList);
  }

  public deleteVideo(id: string): void {
    this.userVideosList = this.userVideosList.filter((video) => video.videoId !== id);
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public deleteVideos(): void {
    this.userVideosList = [];
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public sortByDate(): void {
    const sortedByDateVideos = this.userVideosList.reverse();
    this.subject.next(sortedByDateVideos);
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
}
