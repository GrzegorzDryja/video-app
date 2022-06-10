export type Video = {
  kind: string,
  etag: string,
  items: [
    {
      kind: string,
      etag: string,
      id: string,
      snippet: {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: {
          default: {
            url: string,
            width: number,
            height: number
          },
          medium: {
            url: string,
            width: number,
            height: number
          },
          high: {
            url: string,
            width: number,
            height: number
          }
        },
        channelTitle: string,
        tags: [],
        categoryId: string,
        liveBroadcastContent: string,
        defaultLanguage: string,
        localized: {
          title: string,
          description: string
        },
        defaultAudioLanguage: string
      },
      statistics: {
        viewCount: string,
        likeCount: string,
        favoriteCount: string,
        commentCount: string
      }
    }
  ],
  pageInfo: {
    totalResults: 1,
    resultsPerPage: number
  }
  userSetting?: {
    favorite: boolean;
    date: Date

  }
}

export type Videos = Video[];
