const mainContainer = document.querySelector('.main')
const successMsg = document.querySelector('.success')

const redLight = document.querySelector('.red')
const greenLight = document.querySelector('.green')

const buttons = document.querySelectorAll('.container div')

let numbers;

let numberIter = 0;

let errorNbr = 0;

let myPassword;

const playError = () => {
    const audio = new Audio("assets/audio/error.mp3")
    audio.volume = 0.2
    audio.play()
}

const playOpen = () => {
    const audio = new Audio("assets/audio/open.mp3")
    audio.volume = 0.2
    audio.play()
}

const playButton = () => {
    const audio = new Audio("assets/audio/button.mp3")
    audio.volume = 0.2
    audio.play()
}

const playApplause = () => {
    const audio = new Audio("assets/audio/applause.mp3")
    audio.volume = 0.2
    audio.play()
}

const playClick = () => {
    const audio = new Audio("assets/audio/click.mp3")
    audio.volume = 0.2
    audio.play()
}

const blinkCircle = (target, classname) => {
    let blinkInterval = setInterval(() => {
        target.classList.toggle(classname)
    }, 500);
    setTimeout(() => {
        clearInterval(blinkInterval)
    }, 2000);
}

const blinkBoth = () => {
    let blinkInterval = setInterval(() => {
        redLight.classList.toggle('green-blink')
        greenLight.classList.toggle('green-blink')
    }, 250);
    setTimeout(() => {
        clearInterval(blinkInterval)
        playOpen()
        successAnim()
        setTimeout(() => {
            playApplause()
        }, 1000);
    }, 3000);
}

const successAnim = () => {
    mainContainer.style.opacity = 0
    mainContainer.style.left = "-50%"
    setTimeout(() => {
        mainContainer.style.display = "none";
        successMsg.style.visibility = "visible";
        successMsg.style.transform = "translate(-50%, -50%) scale(1)"
        successAlert()
    }, 1750);
}

const successAlert = () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: 'success',
        timerProgressBar: true,
        title: "Bien joué !"
    })
}

const sleep = timeMs => {
    return new Promise(resolve => setTimeout(resolve, timeMs))
}

const hackingPassword = async () => {
    document.querySelector('.skip').style.visibility = "hidden"
    document.querySelector('h2').style.visibility = "hidden"
    let passwordArray = myPassword.toString().split("")
    for (let i = 0; i <= passwordArray.length - 1; i++){
        let nextNum = passwordArray[i]
        numbers[i].textContent = nextNum
        for (const button of buttons) {
            if (button.textContent == nextNum){
                button.style.backgroundColor = "green"
            }
        }
        playClick()
        await sleep(1000)
    }
    blinkBoth()
    
}

const clickNumber = (e) => {
    let number = parseInt(e.target.textContent);
    if (numberIter < myPassword.toString().split('').length){
        playButton()
        checkNumber(number, e)
    }
}

const checkNumber = (num, event) => {
    let passwordArray = myPassword.toString().split("");
    if (numbers[numberIter].textContent === "*" && num === parseInt(passwordArray[numberIter])){
        if (numberIter == numbers.length - 1){
            blinkBoth()
        } else {
            blinkCircle(greenLight, 'green-blink')
        }
        event.target.style.backgroundColor = "green"
        setTimeout(() => {
            numbers[numberIter].textContent = num
            numberIter += 1
        }, 2000);
    } else if (myPassword.toString().split("").includes(event.target.textContent)) {
        event.target.style.backgroundColor = "pink"
    }  else {
        blinkCircle(redLight, 'red-blink')
        playError()
    }
    
}

const generatePassword = (length) => {
    let passwordArray = [];
    for (let i = 0; i < length; i++){
        passwordArray[i] = Math.floor(Math.random() * 10)
    }
    return passwordArray.join('')
}

for (const button of buttons) {
    button.addEventListener('click', clickNumber)
}
document.querySelector('.skip').addEventListener('click', hackingPassword)

window.addEventListener('load', () => {
    myPassword = generatePassword(4)
    for (let i = 0; i < myPassword.length; i++){
        let newNumber = document.createElement('span')
        newNumber.textContent = "*"
        document.querySelector('.password').appendChild(newNumber)
    }
    numbers = document.querySelectorAll('span')
})