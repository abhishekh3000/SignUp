require('dotenv').config()
const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')

const Schema = mongoose.Schema

const signSch = new mongoose.Schema({
    email: String,
    password: String,
})

signSch.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] })

const sSchema = mongoose.model("UsersDatabase", signSch)
module.exports = sSchema 