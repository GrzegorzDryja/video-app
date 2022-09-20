import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import * as VideosActions from '@core/store/videos.actions';
import { YoutubeService } from '@core/services/youtube.service';
import { DataService } from '@core/services/data.service';
import { VimeoService } from '@core/services/vimeo.service';

@Injectable()
export class VideosEffects {
  addYouTubeVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideosActions.addYouTubeVideo),
      exhaustMap((action) =>
        this.youtubeService.fetchVideo(action.videoId).pipe(
          map((video) => {
            const videos = this.data.addYouTubeVideo(video);
            return VideosActions.addVideoSucces({ videos });
          }),
          catchError((error) => of(VideosActions.addVideoFailure({ error })))
        )
      )
    );
  });

  addVimeoVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideosActions.addVimeoVideo),
      exhaustMap((action) =>
        this.vimeoService.fetchVideo(action.videoId).pipe(
          map((video) => {
            console.log(video);
            const videos = this.data.addVimeoVideo(video);
            return VideosActions.addVideoSucces({ videos });
          }),
          catchError((error) => of(VideosActions.addVideoFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    private data: DataService
  ) {}
}
