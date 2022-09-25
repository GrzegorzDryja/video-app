import { Videos } from '@models/video.model';

export interface VideosStateInterface {
  isLoading: boolean;
  videos: Videos;
  lastDeletedVideo: Videos;
  error: string | null;
  showLovedVideos: boolean;
}
