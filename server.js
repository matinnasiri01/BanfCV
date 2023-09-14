const express = require('express')
require('dotenv').config()
const port = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use('/', require('./routes/routes'))


app.listen(port, () => console.log(`Server On ${port} Is Running...`))