import { Videos } from '@models/video.model';

export interface VideosStateInterface {
  isLoading: boolean;
  videos: Videos;
  error: string | null;
}
