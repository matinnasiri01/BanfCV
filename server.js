
const express = require('express')
const app = express()


app.get("/",(req,res)=>res.send("Hi"))

app.listen(3000,()=> console.log("Server On 3000 Is Running..."))