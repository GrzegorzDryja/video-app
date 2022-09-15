import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import * as VideosActions from '@core/store/actions';
import { LocalStorageService } from '@core/services/local-storage.service';

@Injectable()
export class VideosEffects {
  getVideosFromLocalStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(VideosActions.getVideosFromLocalStorage),
      mergeMap(() => {
        return this.localStorage.getLocalStorage().pipe(
          map((videos) => VideosActions.getVideosFromLocalStorageSucces({ videos })),
          catchError((error) => of(VideosActions.getVideosFromLocalStorageFailure({ error: error.message })))
        );
      })
    );    
  });

  addVideo$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(VideosActions.addVideo),
    mergeMap(() => {
      return this.localStorage.getLocalStorage().pipe(
        map((videos) => VideosActions.addVideoSucces({ videos })),
        catchError((error) => of(VideosActions.addVideoFailure({ error: error.message })))
        );
      })
    );
  });

  constructor(private actions$: Actions, private localStorage: LocalStorageService) {}
}
