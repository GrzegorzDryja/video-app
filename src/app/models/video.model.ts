export type Video = 
{
    platform: string, //"youtube" | "vimeo",
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
