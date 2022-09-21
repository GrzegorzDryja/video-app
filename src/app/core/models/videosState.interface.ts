import { Videos } from '@models/video.model';
import { Layout } from './layout.model';

export interface VideosStateInterface {
  isLoading: boolean;
  videos: Videos;
  lastDeletedVideo: Videos;
  error: string | null;
  layout: Layout;
  showLoved: boolean;
}
