const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config({path:'./config/config.env'})

connectDB()

const app = express()

app.use(express.static('public'))

app.use(express.json())

app.use('/api/users',require('./routes/api/users'))
app.use('/api/cars',require('./routes/api/cars'))

const port = process.env.PORT || 9999

app.listen(port,()=>console.log(`SERVER USPOSTAVLJEN NA ADRESI : http://localhost:${port}`))