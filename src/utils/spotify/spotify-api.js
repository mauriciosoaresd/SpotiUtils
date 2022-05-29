import sendAxiosRequest from "../sendAxiosRequestModule"

const BASE_URL = 'https://api.spotify.com'

export async function getMyProfile(token) {
  return sendAxiosRequest(`${BASE_URL}/v1/me`, 'GET', token)
}

export async function getLibrary(token, offset = 0, limit = 1) {
  return sendAxiosRequest(`${BASE_URL}/v1/me/tracks?offset=${offset}&limit=${limit}`, 'GET', token)
}

export async function getPlaylists(token, offset = 0, limit = 50) {
  return sendAxiosRequest(`${BASE_URL}/v1/me/playlists?offset=${offset}&limit=${limit}`, 'GET', token)
}

export async function getPlaylist(token, playlistId, offset = 0, limit = 50) {
  return sendAxiosRequest(`${BASE_URL}/v1/playlists/${playlistId}/tracks?country=BR&limit=${limit}&offset=${offset}`, 'GET', token)
}

export async function getRandomTrack(token, playlistId, offset = 0, limit = 1) {
  return sendAxiosRequest(`${BASE_URL}/v1/playlists/${playlistId}/tracks?country=BR&limit=${limit}&offset=${offset}`, 'GET', token)
}

export async function getRandomTrackSaved(token, offset = 0, limit = 1) {
  return sendAxiosRequest(`${BASE_URL}/v1/me/tracks?offset=${offset}&limit=${limit}`, 'GET', token)
}

export async function getMostListenedArtists(time_range, limit, offset, token) {
  return sendAxiosRequest(`${BASE_URL}/v1/me/top/artists?time_range=${time_range}&limit=${limit}&offset=${offset}`, 'GET', token)
}

export async function getMostListenedTracks(time_range, limit, offset, token) {
  return sendAxiosRequest(`${BASE_URL}/v1/me/top/tracks?time_range=${time_range}&limit=${limit}&offset=${offset}`, 'GET', token)
}