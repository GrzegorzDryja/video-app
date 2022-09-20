import { createAction, props } from '@ngrx/store';

import { Videos } from '@models/video.model';
import { Layout } from '@core/models/layout.model';

export const getVideosFromLocalStorage = createAction('[Videos] Get Videos From Local Storage');
export const getVideosFromLocalStorageSucces = createAction(
  '[Videos] Get Videos From Local Storage succes',
  props<{ videos: Videos }>()
);
export const getVideosFromLocalStorageFailure = createAction(
  '[Videos] Get Videos From Local Storage failure',
  props<{ error: string }>()
);

export const loadDemoVideos = createAction('[Videos] Load Demo');
export const loadDemoVideosSucces = createAction('[Videos] Load Demo succes', props<{ videos: Videos }>());
export const loadDemoVideosFailure = createAction('[Videos] Load Demo error', props<{ error: string }>());

export const changeGridLayout = createAction('[Videos] Change Grid Layout');
export const changeGridLayoutSucces = createAction('[Videos] Change Grid Layout succes', props<{ layout: Layout }>());
export const changeGridLayoutoFailure = createAction('[Videos] Change Grid Layout error', props<{ error: string }>());

export const showLovedVideos = createAction('[Videos] Show Loved Videos');
export const showLovedVideosSucces = createAction('[Videos] Show Loved Videos succes', props<{ layout: Layout }>());
export const showLovedVideosFailure = createAction('[Videos] Show Loved Videos error', props<{ error: string }>());

export const sortVideosByDate = createAction('[Videos] Sort Videos By Date');
export const sortVideosByDateSucces = createAction('[Videos] Sort Videos By Date succes', props<{ videos: Videos }>());
export const sortVideosByDateFailure = createAction('[Videos] Sort Videos By Date error', props<{ error: string }>());

export const deleteVideosList = createAction('[Videos] Delete Videos List');
export const deleteVideosListSucces = createAction('[Videos] Delete Videos List succes', props<{ videos: Videos }>());
export const deleteVideosListFailure = createAction('[Videos] Delete Videos List error', props<{ error: string }>());

export const addVideo = createAction('[Videos] Add Video');
export const addVideoSucces = createAction('[Videos] Add Video succes', props<{ videos: Videos }>());
export const addVideoFailure = createAction('[Videos] Add Video error', props<{ error: string }>());

export const deleteVideo = createAction('[Videos] Delete Video');
export const deleteVideoSucces = createAction('[Videos] Delete Video succes', props<{ videos: Videos }>());
export const deleteVideoFailure = createAction('[Videos] Delete Video error', props<{ error: string }>());

export const loveVideo = createAction('[Videos] Love Video');
export const loveVideoSucces = createAction('[Videos] Love Video succes', props<{ videos: Videos }>());
export const loveVideoFailure = createAction('[Videos] Love Video error', props<{ error: string }>());

export const playVideo = createAction('[Videos] Play Video');
export const playVideoSucces = createAction('[Videos] Play Video succes', props<{ layout: Layout }>());
export const playVideoFailure = createAction('[Videos] Play Video error', props<{ error: string }>());

export const changePage = createAction('[Videos] Change Page');
export const changePageSucces = createAction('[Videos] Change Page succes', props<{ layout: Layout }>());
export const changePageFailure = createAction('[Videos] Change Page error', props<{ error: string }>());
