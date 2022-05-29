const jwt = require('jsonwebtoken')

module.exports = {
    login
}

function login(userData) {
    try {
        let payload = {
            _id: userData._id,
            name: userData.userName,
            Stoken: userData.Spotify_Access_Token,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt
        }
        return createJWT(payload)
    } catch(error) {
        throw new Error('Error creating Spotify Tokens')
    }
}

function createJWT(user) {
    return jwt.sign(
        {user},
        process.env.SECRET,
        // {expiresIn: '1h'}
        {expiresIn: 20}
    )
}