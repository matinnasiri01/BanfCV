module.exports = (req, res, next) => {
    const data = require('../data.json')
    const isAW = Object.keys(data).length !== 0
    res.locals.hview = isAW ? 'index' : 'update'
    next() 
}