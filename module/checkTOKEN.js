module.exports = (req, res, next) => {
    const token = req.header('token')
    res.locals.oky = token && token === process.env.TOKEN
    next()
}