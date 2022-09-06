import { testDictionary } from "./words.js"

var state = {
    currentRow: 0,
    currentColumn: 0,
    board: Array(6).fill().map(() => Array(5).fill("")),
    hiddenWord: testDictionary[Math.floor(Math.random() * testDictionary.length)],
    delay: false
}

var eventFunction = (event) => {
    let char = event.key
    if(!isThereDelay()){
        if (isLetter(char)) {
            addLetter(char)
        } else if (char === "Backspace") {
            removeLetter()
        } else if (char === "Enter") {
            checkWord()
        }
    }
}

const getKeyboardEvent = () => {
    document.body.addEventListener("keyup",eventFunction)
}

console.log(state.hiddenWord)

const drawBoard = (row, column) => {
    const game = document.getElementById("game")
    game.style.gridTemplateColumns = `repeat(${column},1fr)`
    game.style.gridTemplateRows = `repeat(${row},1fr)`
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const box = document.createElement("div")
            box.id = `box${i}-${j}`
            box.classList.add("box")
            game.appendChild(box)
        }
    }
    console.log("alert")
}


const addLetter = (letter) => {
    const box = document.getElementById(`box${state.currentRow}-${state.currentColumn}`)
    if (state.currentColumn !== 4) {
        box.textContent = letter
        state.board[state.currentRow][state.currentColumn] = letter
        state.currentColumn += 1
    } else if (box.textContent === "") {
        box.textContent = letter
        state.board[state.currentRow][state.currentColumn] = letter
    }
}

const removeLetter = () => {
    const box = document.getElementById(`box${state.currentRow}-${state.currentColumn}`)
    if (state.currentColumn !== 0 && box.textContent === "") {
        state.currentColumn -= 1
        document.getElementById(`box${state.currentRow}-${state.currentColumn}`).textContent = ''
        state.board[state.currentRow][state.currentColumn] = ''
    } else if (state.currentColumn === 0) {
        box.textContent = ''
        state.board[state.currentRow][state.currentColumn] = ''
    }else{
        box.textContent = ''
        state.board[state.currentRow][state.currentColumn] = ''
    }
}


const isLetter = (char) => {
    return char.length === 1 && char.match(/[a-z]/i);
}

const checkDictionary = (word) => {
    return testDictionary.includes(word)
}
const checkWord = () => {
    const lastWord = state.board[state.currentRow].join("") || ""
    console.log(lastWord)
    
    if (lastWord.length !== 5) {
        alert("Eksik harf")
        return
    } 
    else if(!checkDictionary(lastWord)){
        alert("Bu kelime sözlükte yok")
        console.log()
        return
    }
    else {
        const word = lastWord.split("")
        word.forEach((letter, index) => {
            const box = document.getElementById(`box${state.currentRow}-${index}`)
            flipping(box,index,letter)
        })
        if(lastWord === state.hiddenWord){
            setTimeout(()=>{
                alert("KAZANDINIZ TEBRİKLER")
                document.body.removeEventListener("keyup",eventFunction)

            },5*500)
        }
        else if(state.currentRow === 5){
            setTimeout(()=>{
                alert("MAALESEF,KELİMEYİ BİLEMEDİNİZ")
                document.body.removeEventListener("keyup",eventFunction)

            },5*500)
        }
        if (state.currentRow !== 5) {
            state.delay = true
            setTimeout(()=>{
                state.currentRow += 1
                state.currentColumn = 0
                state.delay = false
            },5*500)
        }
    }
}


const isThereDelay = ()=>{
    return state.delay
}

const flipping = (box,index,letter) => {
    setTimeout(()=>{
        box.style.animation = "flipAnimation 1s ease-in-out"
        if (state.hiddenWord.includes(letter) && letter === state.hiddenWord.charAt(index)) {
            box.classList.add("correct")
        } else if (state.hiddenWord.includes(letter)) {
            box.classList.add("partially-correct")
        } else {
            box.classList.add("incorrect")
        }
    },index*500)
}

const startGame = () => {
    drawBoard(6, 5)
    getKeyboardEvent()
}

startGame()