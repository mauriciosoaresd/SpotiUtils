var router = require('express').Router()
var passport = require('passport')

const usersCtrl = require('../controllers/users')
const { refreshToken } = require('../config/refresh')
const { searchVid } = require('../controllers/youtube')

async function handleSpotifyLogin(req, res) {
    let token = await usersCtrl.login(req.user)
    res.redirect(`/auth/token/${token}`)

}

router.get('/auth/spotify', passport.authenticate(
    'spotify',
    ({
        display: 'popup',
        scope: ['user-top-read', 'playlist-read-private', 'user-library-read', 'playlist-modify-public'],
        showDialog: true
    })
))

router.get('/auth/spotify/callback', passport.authenticate(
    'spotify', { session: true, failureRedirect: '/' }),
    handleSpotifyLogin
)

router.get('/refresh_token', async function (req, res) {
    if (req.user == null) {
        res.json({"redirected":true})
    } else {
        console.log('else')
        let token = refreshToken(req.user).then(() => usersCtrl.login(req.user))

        res.json({ "JWT": await token })
    }

})

router.post('/searchVideo', function (req, res) {
    searchVid(req.body.track).then(data => res.send({ data: data.items[0] }))

})


module.exports = router;