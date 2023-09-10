const express = require('express')
const router = express.Router()

router.get('/news', (req, res) => {
    res.send('end')
})


module.exports = router