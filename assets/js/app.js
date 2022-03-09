const myPassword = 4016

const mainContainer = document.querySelector('.main')
const successMsg = document.querySelector('.success')

const redLight = document.querySelector('.red')
const greenLight = document.querySelector('.green')

const firstHelp = document.querySelector('.first-help')
const secondHelp = document.querySelector('.second-help')

const buttons = document.querySelectorAll('.container div')

const numbers = document.querySelectorAll('span')

let numberIter = 0;

let errorNbr = 0;

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
    firstHelp.style.opacity = 0
    secondHelp.style.opacity = 0
    firstHelp.style.transform = "scale(0)"
    secondHelp.style.transform = "scale(0)"
    setTimeout(() => {
        mainContainer.style.display = "none";
        successMsg.style.visibility = "visible";
        successMsg.style.transform = "translate(-50%, -50%) scale(1)"
    }, 1750);
}

const clickNumber = (e) => {
    let number = parseInt(e.target.textContent);
    if (numberIter < myPassword.toString().split('').length){
        playButton()
        checkNumber(number)
    }
}

const checkError = () => {
    if (errorNbr == 2){
        firstHelp.style.visibility = "visible"
    }
    if (errorNbr == 4){
        secondHelp.style.visibility = "visible"
    }
    errorNbr += 1
}

const checkNumber = (num) => {
    let passwordArray = myPassword.toString().split("");
    if (numbers[numberIter].textContent === "*" && num === parseInt(passwordArray[numberIter])){
        if (numberIter == numbers.length - 1){
            blinkBoth()
        } else {
            blinkCircle(greenLight, 'green-blink')
        }
        setTimeout(() => {
            numbers[numberIter].textContent = num
            numberIter += 1
        }, 2000);
    } else {
        blinkCircle(redLight, 'red-blink')
        playError()
        checkError()
    }
    
}

for (const button of buttons) {
    button.addEventListener('click', clickNumber)
}