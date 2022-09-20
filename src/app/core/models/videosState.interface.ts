import { Videos } from '@models/video.model';
import { Layout } from './layout.model';

export interface VideosStateInterface {
  isLoading: boolean;
  videos: Videos;
  error: string | null;
  layout: Layout;
}
