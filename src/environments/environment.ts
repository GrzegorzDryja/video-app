import { YOUTUBE_API_KEY } from '@credentials/credentials';

export const environment = {
  production: false,
  youTubeApiKeyAndOptions: `&key=${YOUTUBE_API_KEY}&part=snippet,statistics`,
  youTubeApiURL: 'https://www.googleapis.com/youtube/v3/videos?id=',
  vimeoApiURL: 'https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/',
  youTubePlayerURL: 'http://www.youtube.com/embed/',
  vimeoPlayerURL: 'https://player.vimeo.com/video/',
};
