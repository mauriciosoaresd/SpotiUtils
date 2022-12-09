var passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

var User = require('../models/user')

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
},
    function (accessToken, refreshToken, expires_in, profile, done) {
        console.log("O DESGRAÇA")
        // User.findOne({ Spotify_User_Id: profile.id }, function (err, user) {
        //     if (err) {
        //         console.log('\x1b[31m', `Error trying to find user...\n${err}`)
        //         done(err)
        //     }
        //     if (user) {
        //         console.log('\x1b[36m%s\x1b[0m', 'User already on system, updating data...')
        //         user.userName = profile.username
        //         user.Spotify_User_Id = profile.id
        //         user.Spotify_Access_Token = accessToken
        //         user.Spotify_Refresh_Token = refreshToken
        //         user.save()
        //         return done(null, user)
        //     } else {
        //         console.log('\x1b[33m', 'New User, saving on database')

        //         var newUser = new User({
        //             userName: profile.userName,
        //             Spotify_User_Id: profile.id,
        //             Spotify_Access_Token: accessToken,
        //             Spotify_Refresh_Token: refreshToken,
        //         })

        //         newUser.save(function (err) {
        //             if (err) return done(err)
        //             return done(null, user)
        //         })
        //     }
        // })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user)
    })
})
