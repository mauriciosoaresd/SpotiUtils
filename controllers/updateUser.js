const passport = require('passport')
var User = require('../models/user')

module.exports = {
    updateUser
}

async function updateUser(accessToken, refreshToken, expires_in, profile) {
    User.findOne({ Spotify_User_Id: profile.Spotify_User_Id }, function (err, user) {
        if (err) {
            console.log('\x1b[31m', `Error trying to find user...\n${err}`)
            return err
        }

        if (user) {
            console.log('\x1b[36m%s\x1b[0m', 'User found, updating data...')
            user.Spotify_User_Id = profile.Spotify_User_Id
            user.Spotify_Access_Token = accessToken
            user.Spotify_Refresh_Token = refreshToken
            user.save()
        }
    })
}
