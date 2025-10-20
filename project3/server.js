// Adding the required libraries
const express = require('express')
const parser = require('body-parser')
const encodedParser = parser.urlencoded( {extended: true })
const multer = require('multer')
const uploadProcessor = multer({dest: 'public/upload/'})

let app = express()
//Array that will hold the objects 
let dogs = []

// Middleware
app.use(express.static('public'))
app.use(encodedParser)
app.set("view engine", 'ejs')

// If the user just goes to the "route" /test then run this function
app.get('/test', function(request, response) {
    response.send("Test: Server is working")
})

// Rout to the first page
app.get('/', function(request, response){
    response.render('home.ejs')
})

// Route to map and send the map the array of the dogs
// Also set the map as active which will be used by site nav to style appropriately
app.get('/map', function(request, response){
    response.render('map.ejs', {AllDogs: dogs, active: 'map'})
})

app.get('/about', function(request, response){
    response.render('about.ejs', {AllDogs:dogs, active: 'about'})
})

// Take the data from the add_dog
app.post('/upload', uploadProcessor.single('theImage') ,(request, response)=>{
    // Adding that data to an object
    let dogName = {
        text: request.body.dog_name,
        lat: parseFloat(request.body.lat),
        lng: parseFloat(request.body.lng),
        needs: {
            water: request.body.needs === 'true',
            food: request.body.needs2 === 'true',
            medical: request.body.needs3 === 'true',
        },
        friendliness: request.body.friendliness
    }
    // console.log(dogName) for debugging
    
    // Take the image
    if(request.file){
        dogName.imgSrc = "/upload/" + request.file.filename
    }

    // Send the object to the array and redirect the user back to the map
    dogs.push(dogName)
    response.redirect('/map')
})

// Use the 5000 port
app.listen(5000, function() {
    console.log("App listening on port 5000")
})