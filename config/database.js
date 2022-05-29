var mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

mongoose.connection.on('connected', function() {
    console.log('... Connected to database')
})

mongoose.exports = mongoose;