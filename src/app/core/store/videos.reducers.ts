import { createReducer, on } from '@ngrx/store';

import { VideosStateInterface } from '@core/models/videosState.interface';
import * as VideosActions from '@core/store/videos.actions';

const initialState: VideosStateInterface = {
  isLoading: false,
  videos: [],
  error: null,
  layout: {
    items: 0,
    grid: false,
    sort: false,
    loved: false,
    currentPage: 0,
    itemPerPage: 8,
    pages: 0,
    player: false,
  },
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

  on(VideosActions.loadDemoVideos, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.loadDemoVideosSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.loadDemoVideosFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.changeGridLayout, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.changeGridLayoutSucces, (state, action) => ({
    ...state,
    isLoading: false,
    layout: action.layout,
  })),
  on(VideosActions.changeGridLayoutoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.showLovedVideos, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.showLovedVideosSucces, (state, action) => ({
    ...state,
    isLoading: false,
    layout: action.layout,
  })),
  on(VideosActions.showLovedVideosFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.sortVideosByDate, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.sortVideosByDateSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.sortVideosByDateFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.deleteVideosList, (state) => ({ ...state, isLoading: true })),
  on(VideosActions.deleteVideosListSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.deleteVideosListFailure, (state, action) => ({
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
  })),

  on(VideosActions.deleteVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.deleteVideoSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.deleteVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.loveVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.loveVideoSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: action.videos,
  })),
  on(VideosActions.loveVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.playVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.playVideoSucces, (state, action) => ({
    ...state,
    isLoading: false,
    layout: action.layout,
  })),
  on(VideosActions.playVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.changePage, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.changePageSucces, (state, action) => ({
    ...state,
    isLoading: false,
    layout: action.layout,
  })),
  on(VideosActions.changePageFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
