import { createReducer, on } from '@ngrx/store';

import { VideosStateInterface } from '@core/models/videosState.interface';
import * as VideosActions from '@core/store/actions';

const initialState: VideosStateInterface = {
  isLoading: false,
  videos: [],
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(VideosActions.getVideosFromLocalStorage, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.getVideosFromLocalStorageSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.getVideosFromLocalStorageFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.addVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.addVideoSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.addVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
