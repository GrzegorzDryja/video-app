export type VimeoResponse = {
    type: string,
    version: string,
    provider_name: string,
    provider_url: string,
    title: string,
    author_name: string,
    author_url: string,
    is_plus: string,
    account_type: string,
    html: string, //"<iframe src=\"https://player.vimeo.com/video/286898202?h=fd61acd044\" width=\"480\" height=\"360\" frameborder=\"0\" title=\"My video\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
    width: number,
    height: number,
    duration: number,
    description: string,
    thumbnail_url: string,
    thumbnail_width: number,
    thumbnail_height: number,
    thumbnail_url_with_play_button: string,
    upload_date: string,
    video_id: number,
    uri: string
}
