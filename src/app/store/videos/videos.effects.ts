import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as VideosActions from '@store/videos/videos.actions';
import { YoutubeService } from '@core/services/youtube.service';
import { VimeoService } from '@core/services/vimeo.service';
import { MatDialogService } from '@core/services/mat-dialog.service';
import { YouTubeResponse } from '@core/models/youtube.model';
import { Videos } from '@core/models/video.model';
import { VideoPlatform } from '@app/shared/models/video-platform.model';
import { VimeoResponse } from '@core/models/vimeo.model';

@Injectable()
export class VideosEffects {
  constructor(
    private actions$: Actions,
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    public dialog: MatDialogService
  ) {}

  addYouTubeVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideosActions.addYouTubeVideo),
      switchMap((action) => {
        return this.youtubeService.fetchVideo(action.videoId).pipe(
          map((video: YouTubeResponse) => {
            const videos = this.parseYouTubeResponse(video);
            return VideosActions.addVideoSuccess({ videos });
          }),
          catchError((error) => [VideosActions.addVideoFailure({ error })])
        );
      })
    )
  );

  addVimeoVideo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideosActions.addVimeoVideo),
      switchMap((action) =>
        this.vimeoService.fetchVideo(action.videoId).pipe(
          map((video: VimeoResponse) => {
            const videos = this.parseVimeoResponse(video);
            return VideosActions.addVideoSuccess({ videos });
          }),
          catchError((error) => of(VideosActions.addVideoFailure({ error })))
        )
      )
    );
  });

  private parseYouTubeResponse = (responseData: YouTubeResponse): Videos => {
    return [
      {
        platform: VideoPlatform.youtube,
        favorite: false,
        date: new Date(),
        videoId: responseData.items[0].id,
        title: responseData.items[0].snippet.title,
        img: responseData.items[0].snippet.thumbnails.default.url,
        viewCount: responseData.items[0].statistics.viewCount,
      },
    ];
  };

  private parseVimeoResponse = (responseData: VimeoResponse): Videos => {
    return [
      {
        platform: VideoPlatform.vimeo,
        favorite: false,
        date: new Date(),
        videoId: responseData.video_id.toString(),
        title: responseData.title,
        img: responseData.thumbnail_url,
        viewCount: 'Brak danych',
      },
    ];
  };
}
