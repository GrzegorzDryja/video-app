import { YouTubeResponse } from "./youtube.model";
import { VimeoResponse } from "./vimeo.model";
import { AppData } from "./appdata.model";

export type Video = 
{
  appData: AppData,
  video: any //YouTubeResponse ] VimeoResponse,
}

export type Videos = Video[]
