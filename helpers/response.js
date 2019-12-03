function response(res,statusCode, error, data) {
    return res.status(statusCode).json({error, data});
}

module.exports = response;