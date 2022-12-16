//jshint esversion:6
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const ejs = require("ejs")
const bodyParser = require('body-parser')
const { log } = require('console')
const Users = require(__dirname + "/model/signupSchema")



const app = express()
console.log(process.env.SECRET);
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

//config.env setup
// const dotenv = require('dotenv')
// dotenv.config({ path: './config.env' })
// console.log(process.env.NODE_ENV)


// mongoose.connect("mongodb+srv://abhishekh:xtkAXDTar5JswNBX@cluster0.mjc2fv8.mongodb.net/UsersDatabase", { useNewUrlParser: true })

//HOSTED CONNECTION:
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)


mongoose.connect("mongodb+srv://abhishekh:xtkAXDTar5JswNBX@cluster0.mjc2fv8.mongodb.net/UsersDatabase", {
    useNewUrlParser: true
    // useCreateIndex: true
    // useUnifiedTopology: true

    // useFindAndModify: false
}).then(rslt_val_of_cnkt_promise => {
    // console.log(rslt_val_of_cnkt_promise.connections);
    console.log('DB connection successfull !');
});



// mongoose.connect(DB, {
//     useNewUrlParser: true
//     // useCreateIndex: true
//     // useUnifiedTopology: true

//     // useFindAndModify: false
// }).then(rslt_val_of_cnkt_promise => {
//     // console.log(rslt_val_of_cnkt_promise.connections);
//     console.log('DB connection successfull !');
// });


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/register', (req, res) => {
    console.log(req.body);
    const uName = req.body.username
    const pass = req.body.password
    const user = new Users({ email: uName, password: pass })
    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("saving");
            res.render('secrets')
        }
    })
})

app.post('/login', (req, res) => {
    const uName = req.body.username
    const pass = req.body.password
    Users.findOne({ email: uName }, function (err, el) {
        if (err) {
            console.log(err);
        } else {
            log("email matched")
            if (el) {
                if (el.password === pass) {
                    console.log("match found");
                    res.render("secrets")
                }
            }
        }

    })

})
app.listen(3000, function () {
    console.log("Port 3000 activated.");
    // console.log(process.env);
}) 