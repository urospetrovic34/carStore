const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
    slike:[{
        type:String
    }],
    
})

module.exports = Car = mongoose.model('car',CarSchema)