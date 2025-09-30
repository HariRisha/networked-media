// Loading everything immediately
window.onload = () => {

    let count = 90 //Set the time to midnight
    const textBody = document.getElementById('text-body')
    const greenEnergy = document.getElementById('green_energy')
    const handShake = document.getElementById('handshake')
    const ai = document.getElementById('ai')

    textBody.textContent = count + " seconds" //Print the remaining time

    //Timer logic
    let timer = setInterval(() => {
        count--

        textBody.textContent = count + " seconds"

        //Make the countdown blink as it is getting closer to 0
        if (count <= 10 && count > 0){ 
            textBody.classList.toggle('blink')
        }


        //What happens when it reaches 0
        if (count <= 0) {
            clearInterval(timer)

            //Clear the page and change the color of the background
            document.body.innerHTML = ''
            document.body.style.backgroundColor = "red";

            //Adding the final message after clearing the screen
            const endMSG = document.createElement('h1')
            endMSG.textContent = "The clock has reached midnight"
            endMSG.style.color = 'white'
            endMSG.style.textAlign = 'center'
            endMSG.style.fontSize = '60px'
            endMSG.style.marginTop = '10vh'
            document.body.appendChild(endMSG)

            const para = document.createElement("p")
            para.textContent = "The world falls silent. Not because we could do nothing, but because we did not do enough."
            para.style.color = "white"
            para.style.textAlign = "center"
            para.style.fontSize = "24px"
            para.style.marginTop = "20px"
            document.body.appendChild(para)
        }
    }, 1000)

    //Adding all the elements in a list so I can assign them all the same class
    const allElements = [greenEnergy, handShake, ai]

    //Function to assign all the elements a class for a certain time
    function disableAllTemporarily(duration){
        for(let i = 0; i < allElements.length; i++){
            allElements[i].classList.add('disabled') //adding the disabled class that was made in css
            let restore = setInterval(() => {
                allElements[i].classList.remove('disabled') //removing it after a certain time
                clearInterval(restore)
            }, duration)
        }
    }

    //Making the image clickable and making it add a short time to the countdown
    greenEnergy.onclick = () => {
        if(count < 86 && count > 0){
            count = count + 4

            disableAllTemporarily(10000) //Make it impossible to beat the timer
        }
    }

    handShake.onclick = () => {
        if(count < 86 && count > 0){
            count = count + 5

            disableAllTemporarily(10000)
        }
    }

    ai.onclick = () => {
        if(count < 86 && count > 0){
            count = count + 3
            
            disableAllTemporarily(10000)
        }      
    }
}

