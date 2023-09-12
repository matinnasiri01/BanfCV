const express = require('express')
const data = require('../data.json')
const routor = express.Router()
const githubData = require('../module/getRepositoryCount')
const fs = require('fs')


// Main
routor.get('/', require('../module/checkDATA'), async (req, res) => {
    const getAllRepoFromGITHUB = await githubData.getRepositoryCount()
    
    res.render(res.locals.hview, {
        "github": data.github,
        "instagram": data.instagram,
        "linkedin": data.linkedin,
        "projects": getAllRepoFromGITHUB.length,
        "aboutDes":data.aboutDes,
        "email":data.email,
        "number":data.number,
        "skillsData": data.skillData,
        "offers": data.offers,
        "filtersWorks" : ["Android","Back End","Other"],
        "recentWorks": [],
        "testimonial":[]
    }) 
})

// Download Resume
routor.get('/downloadResume', async (req, res) => await res.download('public/pdf/MatinNasiriAndroid.pdf'))

// Admin
routor.post('/admin',require('../module/checkTOKEN'), async (req, res) => {
    
        if (!res.locals.oky)
            res.status(403).json({ message: 'Your token is invalid!',date:Date()})
        else {
            await fs.writeFile("data.json", JSON.stringify(req.body), (err) => {
                if (err) res.status(500).json({message:'An error occurred on the server',error: err.message ,date:Date()})
                console.log('Json Is Update!')
                res.status(201).json({ message: 'Done!', newData: req.body, date: Date() })
            })
        }
})




// 404
routor.use((req, res, next) => res.redirect('/'))


module.exports = routor