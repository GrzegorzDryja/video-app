export type Video = 
{
    platform: string,
    id: number,
    favorite: boolean,
    date: Date
    videoId: string,
    playerLink: string,
    title: string,
    img: string,
    viewCount: string
}

export type Videos = Video[]
