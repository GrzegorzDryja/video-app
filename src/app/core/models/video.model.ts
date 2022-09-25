export type Video = {
  platform: string;
  favorite: boolean;
  date: Date | string;
  videoId: string;
  title: string;
  img: string;
  viewCount: string;
  likes: string;
  playLink: string;
};

export type Videos = Video[];
