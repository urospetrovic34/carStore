const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CarSchema = new Schema({
    marka:{
        type:String,
        required: false
    },
    model:{
        type:String,
        required: false
    },
    godiste:{
        type:Number,
        required: false
    },
    kilometraza:{
        type:Number,
        required: false
    },
    karoserija:{
        type:String,
        required: false
    },
    gorivo:{
        type:String,
        required: false
    },
    kubikaza:{
        type:Number,
        required: false
    },
    snagaMotora:{
        type:Number,
        required: false
    },
    cena:{
        type:Number,
        required: false
    },
    slika:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: false
    },
    datum: {
        type: Date,
        default: Date.now
    },
})

module.exports = Car = mongoose.model('car',CarSchema)