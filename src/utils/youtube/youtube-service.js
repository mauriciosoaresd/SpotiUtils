import * as YoutubeApi from '../youtube/youtube-api'

export async function searchVideo(trackStr) {
    return await YoutubeApi.searchVideo(trackStr).then(res => res.json())
}
