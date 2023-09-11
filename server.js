const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use('/', require('./routes/routes'))


app.listen(3003, () =>console.log("Server On 3003 Is Running..."))