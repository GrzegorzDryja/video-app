import { createReducer, on } from '@ngrx/store';

import { VideosStateInterface } from '@core/models/videosState.interface';
import * as VideosActions from '@core/store/videos.actions';
import { Video, Videos } from '@core/models/video.model';

const initialState: VideosStateInterface = {
  isLoading: false,
  videos: [],
  lastDeletedVideo: [],
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

  // on(VideosActions.getVideosFromLocalStorage, (state) => ({ ...state, isLoading: true })),
  // on(VideosActions.getVideosFromLocalStorageSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   videos: action.videos,
  // })),
  // on(VideosActions.getVideosFromLocalStorageFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  // on(VideosActions.loadDemoVideos, (state) => ({ ...state, isLoading: true })),
  // on(VideosActions.loadDemoVideosSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   videos: action.videos,
  // })),
  // on(VideosActions.loadDemoVideosFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  // on(VideosActions.changeGridLayout, (state) => ({ ...state, isLoading: true })),
  // on(VideosActions.changeGridLayoutSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   layout: action.layout,
  // })),
  // on(VideosActions.changeGridLayoutoFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  // on(VideosActions.showLovedVideos, (state) => ({ ...state, isLoading: true })),
  // on(VideosActions.showLovedVideosSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   layout: action.layout,
  // })),
  // on(VideosActions.showLovedVideosFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  // on(VideosActions.sortVideosByDate, (state) => ({ ...state, isLoading: true })),
  // on(VideosActions.sortVideosByDateSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   videos: action.videos,
  // })),
  // on(VideosActions.sortVideosByDateFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  on(VideosActions.deleteVideosList, (state) => ({ ...state, videos: [] })),

  on(VideosActions.addVimeoVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.addYouTubeVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.addVideoSucces, (state, action) => ({
    ...state,
    isLoading: false,
    videos: [...state.videos, ...action.videos],
  })),
  on(VideosActions.addVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.deleteVideo, (state, action) => {
    const videos: Videos = [...state.videos];

    return {
      ...state,
      lastDeletedVideo: [
        ...videos.splice(
          state.videos.findIndex((video) => video.videoId === action.videoId),
          1
        ),
      ],
      videos: [...videos],
    };
  }),

  on(VideosActions.loveVideo, (state, action) => {
    const videos: Videos = [...state.videos];
    const i: number = state.videos.findIndex((video) => video.videoId === action.videoId);
    const v: Video = Object.assign({}, state.videos[i]);
    v.favorite = !v.favorite;
    videos.splice(i, 1, v);

    return {
      ...state,
      videos: [...videos],
    };
  }),

  // on(VideosActions.playVideo, (state) => ({
  //   ...state,
  //   isLoading: true,
  // })),
  // on(VideosActions.playVideoSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   layout: action.layout,
  // })),
  // on(VideosActions.playVideoFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  // on(VideosActions.changePage, (state) => ({
  //   ...state,
  //   isLoading: true,
  // })),
  // on(VideosActions.changePageSucces, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   layout: action.layout,
  // })),
  // on(VideosActions.changePageFailure, (state, action) => ({
  //   ...state,
  //   isLoading: false,
  //   error: action.error,
  // })),

  on(VideosActions.undoLastVideo, (state) => ({
    ...state,
    videos: [...state.videos, ...state.lastDeletedVideo],
    lastDeletedVideo: [],
  }))
);
