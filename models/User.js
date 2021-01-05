const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
    dateCreatedAt: {
        type: Date,
        default: Date.now
      },
    admin:{
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = User = mongoose.model('user',UserSchema)