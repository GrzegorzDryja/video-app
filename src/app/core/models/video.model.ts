export type Video = {
  platform: string;
  favorite: boolean;
  date: Date;
  videoId: string;
  title: string;
  img: string;
  viewCount: string;
};

export type Videos = Video[];
