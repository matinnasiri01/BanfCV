const express = require('express')
const routor = express.Router()

// Main
routor.get('/',(req, res) => res.render('index', JSON.parse(process.env.CONFIG)))

// Download Resume
routor.get('/downloadResume', (req, res) => res.download('public/pdf/MatinNasiriAndroid.pdf'))

// Admin
routor
    .route('/admin')
    .get((req, res) => res.json(JSON.parse(process.env.CONFIG)))
    .post((req,res)=> res.send('beferes!'))


// 404
routor.use((req, res, next) => res.redirect('/'))


module.exports = routor