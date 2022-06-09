const YOUTUBE_FULL_PATH =  new RegExp (/^(https\:\/\/www\.youtube\.com\/watch\?v\=)+([a-zA-Z0-9_.-]{11})$/)   //for include use string "https://www.youtube.com/watch?v=" 
const YOUTUBE_SHORT_PATH = new RegExp (/^(https\:\/\/www\.youtu\.be\/)+([a-zA-Z0-9_.-]{11})$/);               //for include use string "https://www.youtu.be/" 
const VIMEO_FULL_PATH = new RegExp (/^(https\:\/\/www\.vimeo\.com\/)+([a-zA-Z0-9_.-]{9})$/);                  //for include use string "https://vimeo.com/"

export const MAX_LINK_LENGTH = "https://www.youtube.com/watch?v=3bR4gly5PSE".length; //Check this video ;)
export const ID_LENGTH = "3bR4gly5PSE".length;
export const YOUTUBE_ID = new RegExp (/^[a-zA-Z0-9_.-]{11}$/);
export const VIMEO_ID = new RegExp (/^[a-zA-Z0-9]{11}$/)

export const SUPPORTED_PATHS = [
    YOUTUBE_FULL_PATH,
    YOUTUBE_SHORT_PATH,
    VIMEO_FULL_PATH
]
