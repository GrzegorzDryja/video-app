const YOUTUBE_FULL_PATH = "https://www.youtube.com/watch?v=";
const YOUTUBE_SHORT_PATH = "https://www.youtu.be/";
const VIMEO_FULL_PATH = "https://vimeo.com/"; 

export const MAX_LINK_LENGTH = "https://www.youtube.com/watch?v=3bR4gly5PSE".length;
export const ID_LENGTH = "3bR4gly5PSE".length;
export const YOUTUBE_ID = new RegExp (/[a-zA-Z0-9_.-]{11}$/);
export const VIMEO_ID = new RegExp (/[a-zA-Z0-9]{9}$/)

export const SUPPORTED_PATHS = [
    YOUTUBE_FULL_PATH,
    YOUTUBE_SHORT_PATH,
    VIMEO_FULL_PATH
]
