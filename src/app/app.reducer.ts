import { DEMO_VIDEOS } from "@core/models/demo.model";
import { Video, Videos } from "@core/models/video.model";

export interface State {
    video: {
        platform: string,
        id: number,
        favorite: Boolean,
        date: Date,
        videoId: string,
        title: string,
        img: string,
        viewCount: number
      }
}

const initialState = {
    video: {
        platform: 'youtube',
        id: 0,
        favorite: false,
        date: new Date(),
        videoId: 'id',
        title: 'tytuł',
        img: 'url img',
        viewCount: 'views',
      }
};

export function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'LOVE_VIDEO':
      return {
        state: true
      };
    case '2':
      return {
        //state 2
      };
    default:
        return state;
  }
}
