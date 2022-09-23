import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '@core/models/appState.interface';
import * as actions from 'app/store/videos.actions';
import * as selectors from 'app/store/videos.selectors';

@Injectable()
export class VideosFacade {
  public loading$ = this.store.select(selectors.isLoadingSelector);
  public videos$ = this.store.select(selectors.videosSelector);
  public error$ = this.store.select(selectors.errorSelector);

  constructor(private store: Store<AppStateInterface>) {}

  public loadDemoVideos(): void {
    this.store.dispatch(actions.loadDemoVideos())
  }

  public addYouTubeVideo(payload: { videoPlatform: string; videoId: string }): void {
    this.store.dispatch(actions.addYouTubeVideo(payload));
  }

  public addVimeoVideo(payload: { videoPlatform: string; videoId: string }): void {
    this.store.dispatch(actions.addVimeoVideo(payload));
  }

  public loveVideo(payload: { videoId: string }): void {
    this.store.dispatch(actions.loveVideo(payload));
  }

  public deleteVideo(payload: { videoId: string }): void {
    this.store.dispatch(actions.deleteVideo(payload));
  }

  public undoLastVideo(): void {
    this.store.dispatch(actions.undoLastVideo());
  }

  public deleteVideosList(): void {
    this.store.dispatch(actions.deleteVideosList());
  }
}
