import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Video, Videos } from '@models/video.model';
import { VimeoResponse } from '@models/vimeo.model';
import { YouTubeResponse } from '@models/youtube.model';
import { VideoPlatform } from '@shared/video-platform.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private lastDeletedVideo: Video | undefined;
  public userVideosList: Videos = [];
  public subject = new Subject<Videos>();

  private love = false;

  constructor(private localStorageService: LocalStorageService) {}

  private updateSubjectAndLocalStorage() {
    this.subject.next(this.userVideosList);
    this.localStorageService.saveToLocalStorage(this.userVideosList);
  }

  public addYouTubeVideo(resp: YouTubeResponse): void {
    this.userVideosList.push({
      platform: VideoPlatform.youtube,
      favorite: false,
      date: new Date(),
      videoId: resp.items[0].id,
      title: resp.items[0].snippet.title,
      img: resp.items[0].snippet.thumbnails.default.url,
      viewCount: resp.items[0].statistics.viewCount,
    });
    this.updateSubjectAndLocalStorage();
  }

  public addVimeoVideo(resp: VimeoResponse): void {
    this.userVideosList.push({
      platform: VideoPlatform.vimeo,
      favorite: false,
      date: new Date(),
      videoId: resp.video_id.toString(),
      title: resp.title,
      img: resp.thumbnail_url,
      viewCount: 'Brak danych',
    });
    this.updateSubjectAndLocalStorage();
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

  public deleteVideo(videoId: string): void {
    this.lastDeletedVideo = this.userVideosList.find((video) => video.videoId === videoId);
    this.userVideosList = this.userVideosList.filter((video) => video.videoId !== videoId);
    this.updateSubjectAndLocalStorage();
  }

  public deleteVideos(): void {
    this.userVideosList = [];
    this.updateSubjectAndLocalStorage();
  }

  public sortByDate(dateSortSwitch: boolean): void {
    dateSortSwitch
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
    this.updateSubjectAndLocalStorage();
  }
}
