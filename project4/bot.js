import dotenv from "dotenv"
dotenv.config()
import { createRestAPIClient } from "masto";

const masto = createRestAPIClient({
    url: "https://networked-media.itp.io/",
    accessToken: process.env.TOKEN
})

// add the request to the database
async function retrieveData(){
    const url = "http://165.227.88.235:7001/all-posts"
    const response = await fetch(url)
    const json = await response.json()
    const posts = json.posts

    let randNum = Math.floor(Math.random() * (posts.length))

    let randText = posts[randNum].text
    makeStatus(randText)
}

async function makeStatus(textStatus){

    const status = await masto.v1.statuses.create({
        status: textStatus,
        visibility: "public",
    })

    console.log(status.url)
}

setInterval( ()=>{
    retrieveData()
}, 3600000)