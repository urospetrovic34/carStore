const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
    marka:{
        type:String,
        required: true
    },
    model:{
        type:String,
        required: true
    },
    godiste:{
        type:Number,
        required: true
    },
    kilometraza:{
        type:Number,
        required: true
    },
    karoserija:{
        type:String,
        required: true
    },
    gorivo:{
        type:String,
        required: true
    },
    kubikaza:{
        type:Number,
        required: true
    },
    snagaMotora:{
        type:Number,
        required: true
    },
    cena:{
        type:Number,
        required: true
    },
    slika:{
        type:String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
})

module.exports = Car = mongoose.model('car',CarSchema)