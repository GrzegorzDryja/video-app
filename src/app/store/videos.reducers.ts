import { createReducer, on } from '@ngrx/store';

import { VideosStateInterface } from '@core/models/videosState.interface';
import * as VideosActions from 'app/store/videos.actions';
import { Video, Videos } from '@core/models/video.model';
import { Actions } from '@ngrx/effects';
import { state } from '@angular/animations';

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
  sortVideos: true,
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

  on(VideosActions.sortVideosByDate, (state, action) => {
    const videos: Videos = [...state.videos];

    action.sortVideos
      ? videos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      ...state,
      sortVideos: action.sortVideos,
      videos: [...videos],
    };
  }),

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

  // public sortByDate(dateSortSwitch: boolean): void {
  //   this.sortByDateSwitch = dateSortSwitch;
  //   this.sortByDateSwitch
  //     ? this.userVideosList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  //     : this.userVideosList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // }
);
