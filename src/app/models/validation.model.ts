// Those regex dosn't work, to do later
const YOUTUBE_FULL_PATH = new RegExp ("") //^(https\:\/\/www\.youtube\.com\/watch\?v\=)+([a-zA-Z0-9_.-]{11})$
const YOUTUBE_SHORT_PATH = new RegExp (""); //^(https\:\/\/www\.youtu\.be\/)+([a-zA-Z0-9_.-]{11})$
const VIMEO_FULL_PATH = new RegExp (""); //^(https\:\/\/www\.vimeo\.com\/)+([a-zA-Z0-9_.-]{9})$

export const YOUTUBE_ID = new RegExp ("^[a-zA-Z0-9_.-]{11}$");

export const SUPPORTED_PATHS = [
    YOUTUBE_FULL_PATH,
    YOUTUBE_SHORT_PATH,
    YOUTUBE_ID,
    VIMEO_FULL_PATH
]
