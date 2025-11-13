const express = require('express')
const bodyParser = require('body-parser')
const nedb = require('@seald-io/nedb')
const multer = require('multer')
const encodedParser = bodyParser.urlencoded({extended: true})


const app = express()

app.use(express.static('public'))
const uploadProcessor = multer( {dest: 'assets/upload/'})
app.use(bodyParser.json())
app.use(encodedParser)

// setting view engine
app.set('view engine', 'ejs')

// creating the database
const database = new nedb({
    filename: 'database.txt',
    autoload: true
}) 

// rendering the main page and sending the data from the database
app.get('/home', (req, res)=>{

    let query = {} // no filters
    let sortQuery = {
        timestamp: 1
    }

    database.find(query).sort(sortQuery).exec((err, dataInDB)=>{
        res.render('index.ejs', {messages: dataInDB})
    })
})

// take the data from the client and store it on the database
app.post('/post', uploadProcessor.single('image'), (req,res)=>{
    let currentTime = new Date()

    let postToBeAdded = {
        date: currentTime.toLocaleDateString(),
        text: req.body.text,
        timestamp: currentTime.getTime(),
    }

    database.insert(postToBeAdded, (err, dataThatHasBeenAdded)=>{
        if(err){
            res.redirect('/home')
        } else {
            res.redirect('/home')
        }
    })
})

// for the api and sending data to clientside js
app.get('/all-messages', (req, res)=> {
    query = {}

    database.find(query).exec( (err, data)=> {
        res.json({messages: data})
    })
})

app.listen(8000, ()=>{
    console.log('server running')
})