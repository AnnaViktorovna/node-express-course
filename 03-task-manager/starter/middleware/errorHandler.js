const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) =>{
if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({msf: err.msg})
}
return res.status(500).json({ message: "Smthg wrong" });
}

module.exports = errorHandlerMiddleware;
