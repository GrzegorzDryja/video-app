import { createAction, props } from '@ngrx/store';

import { Videos } from '@models/video.model';

export const getVideosFromLocalStorage = createAction('[Videos] Get Videos From Local Storage');
export const getVideosFromLocalStorageSuccess = createAction(
  '[Videos] Get Videos From Local Storage success',
  props<{ videos: Videos }>()
);
export const getVideosFromLocalStorageFailure = createAction(
  '[Videos] Get Videos From Local Storage failure',
  props<{ error: string }>()
);

export const loadDemoVideos = createAction('[Videos] Load Demo');
export const loadDemoVideosSuccess = createAction('[Videos] Load Demo success', props<{ videos: Videos }>());
export const loadDemoVideosFailure = createAction('[Videos] Load Demo error', props<{ error: string }>());

export const sortVideosByDate = createAction('[Videos] Sort Videos By Date', props<{ sortVideos: boolean}>());

export const deleteVideosList = createAction('[Videos] Delete Videos List');

export const addYouTubeVideo = createAction(
  '[Videos] Add YouTube Video',
  props<{ videoPlatform: string; videoId: string }>()
);
export const addVimeoVideo = createAction(
  '[Videos] Add Vimeo Video',
  props<{ videoPlatform: string; videoId: string }>());

export const addVideoSuccess = createAction('[Videos] Add Video success', props<{ videos: Videos }>());
export const addVideoFailure = createAction('[Videos] Add Video error', props<{ error: string }>());

export const deleteVideo = createAction('[Videos] Delete Video', props<{ videoId: string }>());
export const undoLastVideo = createAction('[Videos] Undo Last Deleted Video');

export const loveVideo = createAction('[Videos] Love Video', props<{ videoId: string }>());

