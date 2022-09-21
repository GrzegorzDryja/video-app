import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppStateInterface } from '@core/models/appState.interface';
import * as actions from '@core/store/videos.actions';
import * as selectors from '@core/store/videos.selectors';

@Injectable()
export class VideosFacade {
  public loading$ = this.store.select(selectors.isLoadingSelector);
  public videos$ = this.store.select(selectors.videosSelector);
  public error$ = this.store.select(selectors.errorSelector);
  public layout$ = this.store.select(selectors.layoutSelector);

  constructor(private store: Store<AppStateInterface>) {}

  public addYouTubeVideo(payload: { videoPlatform: string; videoId: string }): void {
    this.store.dispatch(actions.addYouTubeVideo(payload));
  }

  public addVimeoVideo(payload: { videoPlatform: string; videoId: string }): void {
    this.store.dispatch(actions.addVimeoVideo(payload));
  }

  public deleteVideo(payload: { videoId: string }): void {
    this.store.dispatch(actions.deleteVideo(payload));
  }
}
