export interface Video {
  platform: string;
  favorite: boolean;
  date: Date | string;
  videoId: string;
  title: string;
  img: string;
  viewCount: string;
};

export type Videos = Video[];
