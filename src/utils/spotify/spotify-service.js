import { getToken, checkToken, renewToken } from '../users/users-service'
import * as spotifyApi from './spotify-api'

export async function getPlaylists(offset, limit) {
    if (await checkToken(getToken())) {
        let newToken = await renewToken()
    }

    return spotifyApi.getPlaylists(getToken().user.Stoken, offset, limit)

}