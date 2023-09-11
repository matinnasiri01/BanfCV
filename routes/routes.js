const express = require('express')
const routor = express.Router()
const fs = require('fs')


// Main
routor.get('/', (req, res) => res.render('index',require('../data.json')))

// Download Resume
routor.get('/downloadResume', async (req, res) => await res.download('public/pdf/MatinNasiriAndroid.pdf'))

// Admin
routor.post('/admin',async (req, res) => {
        await fs.writeFile("data.json", JSON.stringify({}), (err) => {
            if (err) throw err
            res.status(201).json({message:"Done!",newData:require('../data.json')})
        })
    })


// 404
routor.use((req, res, next) => res.redirect('/'))


module.exports = routor