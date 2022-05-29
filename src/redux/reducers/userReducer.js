import { Buffer } from 'buffer';

let initialState = { loggedIn: false };
if (window.localStorage.getItem('token') && window.localStorage.getItem('token').split('.')[1]) {

    initialState = {
        loggedIn: true,
        user: (JSON.parse(Buffer.from(window.localStorage.getItem('token').split('.')[1], 'base64').toString('binary'))).user,
        playlists: { items: [] },
        conversionPlaylist: { items: [] },
        library: null,
        loading: false,
        spotifyStats: {
            artists: {},
            tracks: {}
        }
    }
} else {
    window.localStorage.removeItem('token')
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "REQUEST_LOGIN":
            return {
                loggedIn: true,
                user: action.payload
            };
        case "REQUEST_LOGOUT":
            return { loggedIn: false };

        case "REFRESH_TOKEN":
            return {
                ...state,
                user: { ...state.user, Stoken: action.payload }
            }
        case "TOGGLE_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "GET_PROFILE":
            return state

        case "LIBRARY_REQUEST":
            return {
                ...state,
                library: {
                    ...action.payload
                }
            }
        case "LIBRARY_RESET":
            return {
                ...state,
                library: null
            }
        case "REQUEST_ALL_PLAYLISTS":
            return {
                ...state,
                playlists: {
                    ...action.payload,
                    items: state.playlists.items.concat(action.payload.items)
                }
            }
        case "RESET_ALL_PLAYLISTS":
            return {
                ...state,
                playlists: {
                    items: []
                }
            }
        case "SET_CONVERSION_PLAYLIST":
            return {
                ...state,
                conversionPlaylist: {
                    ...action.payload,
                    items: state.conversionPlaylist.items.concat(action.payload.items)
                }
            }
        case "RESET_CONVERSION_PLAYLIST":
            return {
                ...state,
                conversionPlaylist: { items: [] }
            }

        case "SET_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: {
                    id: action.payload.id,
                    total: action.payload.total
                }
            }
        case "RESET_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: undefined
            }
        case "SET_RANDOM_SONG":
            return {
                ...state,
                randomSong: {
                    ...action.payload
                }
            }
        case "RESET_RANDOM_SONG":
            return {
                ...state,
                randomSong: {}
            }
        case "SET_SONG":
            return {
                ...state,
                selectedSong: {
                    ...action.payload
                }
            }
        case "RESET_SONG":
            return {
                ...state,
                selectedSong: undefined
            }
        case "GET_SPOTIFY_STATS":
            return state

        case "RESET_SPOTIFY_STATS":
            return {
                ...state,
                spotifyStats: {
                    artists: {},
                    tracks: {}
                }
            }
        case "SET_MOST_LISTENED_ARTISTS":
            return {
                ...state,
                spotifyStats: {
                    ...state.spotifyStats,
                    artists: {
                        ...state.spotifyStats.artists,
                        ...action.payload
                    }
                }
            }

        case "SET_MOST_LISTENED_TRACKS":
            return {
                ...state,
                spotifyStats: {
                    ...state.spotifyStats,
                    tracks: {
                        ...state.spotifyStats.tracks,
                        ...action.payload
                    }
                }
            }

        case "SET_SONGS_TO_CONVERT":
            return {
                ...state,
                convertSongs: action.payload
            }

        case "RESET_SONGS_TO_CONVERT":
            return {
                ...state,
                convertSongs: undefined
            }


        default:
            return state;
    }
}

export default reducer;