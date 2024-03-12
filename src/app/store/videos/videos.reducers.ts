import { createReducer, on } from '@ngrx/store';

import * as VideosActions from '@store/videos/videos.actions';
import { VideosStateInterface } from '@app/core/models/videos-state.interface';
import { Video, Videos } from '@core/models/video.model';
import { DEMO_VIDEOS } from '@core/models/demo.model';

const initialState: VideosStateInterface = {
  isLoading: false,
  videos: [],
  lastDeletedVideo: [],
  error: null,
};

export const reducers = createReducer(
  initialState,

  on(VideosActions.loadDemoVideos, (state) => ({
    ...state,
    isLoading: false,
    videos: [...DEMO_VIDEOS],
  })),

  on(VideosActions.deleteVideosList, (state) => ({ ...state, videos: [] })),

  on(VideosActions.addVimeoVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.addYouTubeVideo, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(VideosActions.addVideoSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    videos: [...structuredClone(state.videos), ...structuredClone(action.videos)],
  })),
  on(VideosActions.addVideoFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VideosActions.deleteVideo, (state, action) => {
    const videos: Videos = structuredClone(state.videos);

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
    const videos: Videos = structuredClone(state.videos);
    const videoToLoveIndex: number = state.videos.findIndex(
      (video) => video.videoId === action.videoId
    );
    const videoToLove: Video = Object.assign(
      {},
      state.videos[videoToLoveIndex]
    );
    videoToLove.favorite = !videoToLove.favorite;
    videos.splice(videoToLoveIndex, 1, videoToLove);

    return {
      ...state,
      videos: [...videos],
    };
  }),

  on(VideosActions.undoLastVideo, (state) => ({
    ...state,
    videos: [...structuredClone(state.videos), ...structuredClone(state.lastDeletedVideo)],
    lastDeletedVideo: [],
  }))
);
