window.onload = () =>{
    refreshMessages()
}

// wait for messages to be received from the server
async function refreshMessages(){
    const url = '/all-messages'

    const response = await fetch(url)
    const data = await response.json()
    console.log(data.messages)
}