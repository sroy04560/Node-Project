const mongose = require('mongoose')



const connectDB = (url) => {
    return mongose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

}

module.exports = connectDB