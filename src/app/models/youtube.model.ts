export interface VIDEO_RESP {
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
          tags: string[],
          categoryId: string,
          liveBroadcastContent: string,
          defaultLanguage: string,
          localized: {
            title: string,
            description: string
          },
          defaultAudioLanguage: string
        },
        contentDetails: {
          duration: string,
          dimension: string,
          definition: string,
          caption: string,
          licensedContent: boolean,
          contentRating: {},
          projection: string
        },
        status: {
          uploadStatus: string,
          privacyStatus: string,
          license: string,
          embeddable: boolean,
          publicStatsViewable: boolean,
          madeForKids: boolean
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
      totalResults: number,
      resultsPerPage: number
    }
  }
  