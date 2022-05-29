var mongoose = require('mongoose')
var findOrCreate = require('mongoose-findorcreate')

var userSchema = new mongoose.Schema({
  userName: String,
  Spotify_Access_Token: String,
  Spotify_Refresh_Token: String,
  Spotify_User_Id: String,
}, {
  timestamps: true
})

userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)