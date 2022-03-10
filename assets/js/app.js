const mainContainer = document.querySelector('.main')

const redLight = document.querySelector('.red')
const greenLight = document.querySelector('.green')

const buttons = document.querySelectorAll('.container div')

let resolveTime;

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
    }, 200);
    setTimeout(() => {
        target.classList.remove(classname)
        clearInterval(blinkInterval)
    }, 1200);
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
    hideSide()
    setTimeout(() => {
        mainContainer.style.display = "none";
        successAlert()
    }, 1750);
}

const successAlert = () => {
    Swal.fire({
        position: 'center',
        showConfirmButton: false,
        icon: 'success',
        title: resolveTime
    })
}

const sleep = timeMs => {
    return new Promise(resolve => setTimeout(resolve, timeMs))
}

const hideSide = () => {
    document.querySelector('.skip').style.visibility = "hidden"
    document.querySelector('h2').style.visibility = "hidden"
    document.querySelector('.timer').style.visibility = "hidden"
}

const hackingPassword = async () => {
    hideSide()
    let passwordArray = myPassword.toString().split("")
    for (let i = 0; i <= passwordArray.length - 1; i++){
        let nextNum = passwordArray[i]
        numbers[i].textContent = nextNum
        for (const button of buttons) {
            if (button.textContent == nextNum){
                button.style.backgroundColor = "green"
                button.className = "active"
            }
        }
        playClick()
        await sleep(1000)
    }
    resolveTime = "Tricheur !"
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
            resolveTime = getTime()
        } else {
            blinkCircle(greenLight, 'green-blink')
        }
        event.target.style.backgroundColor = "green"
        event.target.className = "active"
        setTimeout(() => {
            numbers[numberIter].textContent = num
            numberIter += 1
        }, 1200);
    } else if (myPassword.toString().split("").includes(event.target.textContent)) {
        event.target.style.backgroundColor = "pink"
    }  else {
        blinkCircle(redLight, 'red-blink')
        playError()
    }
    
}

const generatePassword = (length) => {
    let passwordArray = [];
    let newNum;
    for (let i = 0; i < length; i++){
        do {
            newNum = Math.floor(Math.random() * 10)
        } while (passwordArray.includes(newNum))
        passwordArray[i] = newNum
    }
    console.log(passwordArray);
    return passwordArray.join('')
}

const getTime = () => {
    let timeArray = document.querySelector('.timer').textContent.split(':')
    return `Réussi en ${timeArray[0]} minutes et ${timeArray[1]} secondes`
}

const startTimer = () => {
    let timer = document.querySelector('.timer')
    let min = 0
    let second = 0
    function formatTime(time){
        if (time < 10) {
            return `0${time}`
        } else return time
    }
    setInterval(() => {
        second += 1
        if (second == 60){
            second = 0
            min += 1
            timer.textContent = `${formatTime(min)}:${formatTime(second)}`
        } else {
            timer.textContent = `${formatTime(min)}:${formatTime(second)}`
        }
    }, 1000);
}

document.querySelector('.skip').addEventListener('click', hackingPassword)

window.addEventListener('load', () => {
    myPassword = generatePassword(4)
    for (let i = 0; i < myPassword.length; i++){
        let newNumber = document.createElement('span')
        newNumber.textContent = "*"
        document.querySelector('.password').appendChild(newNumber)
        for (const button of buttons) {
            button.addEventListener('click', clickNumber)
        }
    }
    numbers = document.querySelectorAll('.password span')
    startTimer()
})