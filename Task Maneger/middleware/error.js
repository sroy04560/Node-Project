const { CustomError } = require('../errors/custom-errors')
const error = (err, req, res, next) => {
    console.log(err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(err.status).json({ msg: `Something went wrong please try again` })
}

module.exports = error