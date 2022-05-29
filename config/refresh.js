const fetch = require('cross-fetch')
const { updateUser } = require('../controllers/updateUser')

module.exports = {
    refreshToken
}

async function refreshToken(userData) {
    try {
        let refreshedToken = await sendRefreshTokenRequest(userData.Spotify_Refresh_Token)
        if(refreshedToken === undefined) return
        userData.Spotify_Access_Token = refreshedToken.access_token

        updateUser(refreshedToken.access_token,
            userData.Spotify_Refresh_Token,
            refreshedToken.expires_in,
            userData)
        return refreshedToken.access_token
    } catch (error) {
        throw new Error('Error creating Spotify Tokens')
    }
}


async function sendRefreshTokenRequest(refreshToken = null, link = "https://accounts.spotify.com/api/token", method = 'POST') {
    const options = { method }
    const url = new URL(link)

    let params = {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        // 'scope': ['playlist-read-private', 'user-library-read']
        scope: ['user-top-read', 'playlist-read-private' ,'user-library-read', 'playlist-modify-public']
        
    }

    options.headers = {
        'Authorization': "Basic " + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    }

    options.json = true
    url.search = new URLSearchParams(params).toString()


    const res = await fetch(url, options)
    
    if (res.ok) var x = await res.json()
    return x
}
