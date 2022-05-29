import * as SpotifyApi from "../../utils/spotify/spotify-api";
import { getToken, signIn, signOut, checkToken, renewToken } from '../../utils/users/users-service';

export const requestLogin = (token) => {
    const userData = signIn(token)
    return (dispatch) => {
        dispatch({ type: "REQUEST_LOGIN", payload: userData })
    }
}

export const requestLogout = () => {
    signOut()
    return (dispatch) => {
        dispatch({ type: "REQUEST_LOGOUT" })
    }
}

export const refreshToken = async () => {
    let JWtoken = renewToken()

    return async (dispatch) => {
        dispatch({ type: "REFRESH_TOKEN", payload: JWtoken })
    }
}

export const toggleLoading = (data) => {
    return (dispatch) => {
        dispatch({ type: "TOGGLE_LOADING", payload: data })
    }
}

export const getMyProfile = () => {
    const JWT = getToken()
    console.log('tentou pegar perfil')

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            return dispatch(await refreshToken(newToken))
        }

        dispatch(toggleLoading(true))
        return SpotifyApi.getMyProfile(getToken().user.Stoken)
            .then(() => {
                return dispatch({ type: "GET_PROFILE" })
            })
    }
}

export const getLibrary = () => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        dispatch(toggleLoading(true))
        return SpotifyApi.getLibrary(getToken().user.Stoken)
            .then((res) => {
                return dispatch({
                    type: "LIBRARY_REQUEST",
                    payload: {
                        id: 'library',
                        name: 'Liked Songs',
                        tracks: { total: res.data.total },
                        images: [{ url: '' }]
                    }
                })
            })
    }
}

export const resetLibrary = () => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        return dispatch({ type: "LIBRARY_RESET" })
    }
}

export const getAllPlaylists = (offset = 0, limit = 50) => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        dispatch(toggleLoading(true))
        return SpotifyApi.getPlaylists(getToken().user.Stoken, offset, limit)
            .then((res) => {
                return dispatch({ type: "REQUEST_ALL_PLAYLISTS", payload: res.data })
            })
    }
}

export const resetAllPlaylists = () => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        return dispatch({ type: "RESET_ALL_PLAYLISTS" })
    }
}

export const getPlaylistToConvert = (id, offset = 0, limit = 50) => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        dispatch(toggleLoading(true))
        return SpotifyApi.getPlaylist(getToken().user.Stoken, id, offset, limit)
            .then((res) => {
                return dispatch({ type: "SET_CONVERSION_PLAYLIST", payload: res.data })
            })

    }
}

export const resetPlaylistToConvert = () => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        return dispatch({ type: "RESET_CONVERSION_PLAYLIST" })
    }
}

export const setSelectedPlaylist = (id, total = 0) => {
    return (dispatch) => {
        dispatch({ type: "SET_PLAYLIST", payload: { id, total } })
    }
}

export const resetSelectedPlaylist = () => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        return dispatch({ type: "RESET_PLAYLIST" })
    }
}


export const getRandomSong = (id, total) => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        let rng = Math.floor(Math.random() * (total))

        dispatch(toggleLoading(true))

        if (id === 'library') {
            return SpotifyApi.getRandomTrackSaved(getToken().user.Stoken, rng)
                .then((res) => {
                    return dispatch({ type: "SET_RANDOM_SONG", payload: res.data.items[0] })
                })
        }


        return SpotifyApi.getRandomTrack(getToken().user.Stoken, id, rng)
            .then((res) => {
                return dispatch({ type: "SET_RANDOM_SONG", payload: res.data.items[0] })
            })
    }

}

export const resetRandomSong = () => {
    return (dispatch) => {
        dispatch({ type: "RESET_RANDOM_SONG" })
    }
}
export const setSongToPlay = (data) => {
    return (dispatch) => {
        dispatch({ type: "SET_SONG", payload: { artists: data.artists, track: data.trackName } })
    }
}

export const resetSongToPlay = () => {
    return (dispatch) => {
        dispatch({ type: "RESET_SONG" })
    }
}

export const getSpotifyStats = () => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        dispatch(toggleLoading(true))

        dispatch(getMostListenedArtists('short_term'))
        dispatch(getMostListenedArtists('medium_term'))
        dispatch(getMostListenedArtists('long_term'))

        dispatch(getMostListenedTracks('short_term'))
        dispatch(getMostListenedTracks('medium_term'))
        dispatch(getMostListenedTracks('long_term'))

        return dispatch({ type: "GET_SPOTIFY_STATS" })
    }
    
}

export const resetSpotifyStats = () => {
    return async (dispatch) => {
        dispatch(toggleLoading(true))
        dispatch({ type: "RESET_SPOTIFY_STATS" })
        return dispatch(getSpotifyStats())
    }
}

export const getMostListenedArtists = (time_range) => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        return SpotifyApi.getMostListenedArtists(time_range, 5, 0, getToken().user.Stoken)
            .then((res) => {
                dispatch({ type: "SET_MOST_LISTENED_ARTISTS", payload: { [`${time_range}`]: res.data } })
            })
    }
}

export const getMostListenedTracks = (time_range) => {
    const JWT = getToken()

    return async (dispatch) => {
        if (await checkToken(JWT)) {
            let newToken = await renewToken()
            dispatch(await refreshToken(newToken))
        }

        return SpotifyApi.getMostListenedTracks(time_range, 10, 0, getToken().user.Stoken)
            .then((res) => {
                dispatch({ type: "SET_MOST_LISTENED_TRACKS", payload: { [`${time_range}`]: res.data } })
            })
    }

}

export const setSongsToConvert = (songs) => {
    return (dispatch) => {
        dispatch({ type: "SET_SONGS_TO_CONVERT", payload: songs })
    }
}

export const resetSongsToConvert = () => {
    return dispatch => {
        dispatch({ type: "RESET_SONGS_TO_CONVERT" })
    }
}