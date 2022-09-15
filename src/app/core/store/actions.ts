import { createAction, props } from '@ngrx/store';

import { Videos } from '@models/video.model';

export const getVideosFromLocalStorage = createAction('[Videos] Get Videos From Local Storage');
export const getVideosFromLocalStorageSucces = createAction(
  '[Videos] Get Videos From Local Storage succes',
  props<{ videos: Videos }>()
);
export const getVideosFromLocalStorageFailure = createAction(
  '[Videos] Get Videos From Local Storage failure',
  props<{ error: string }>()
);

export const addVideo = createAction('[Videos] Add Video');
export const addVideoSucces = createAction('[Videos] Add Video succes', props<{ videos: Videos }>());
export const addVideoFailure = createAction('[Videos] Add Video error', props<{ error: string }>());
