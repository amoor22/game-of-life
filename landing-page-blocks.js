let width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

let height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


let rows = 25
// let cols = 31
let cols = 25

into = document.querySelector('.blocks-layer')
intoStyle = getComputedStyle(into)

let blocks = []
class Block {
    constructor(x, y, w, h, row, col) {
        this.square = document.createElement("div")
        this.initSquare(x, y, w, h, row, col)
    }

    initSquare(x, y, w, h, row, col) {
        this.square.setAttribute('draggable', false);
        this.square.style.position = 'absolute'
        this.square.style.left = `${x}px`
        this.square.style.top = `${y}px`
        this.square.style.width = `${w}px`;
        this.square.style.height = `${h}px`;
        this.square.setAttribute('place', `${row} ${col}`)
        this.square.className = "block"
    }
    
}
function insertBlocks() {
    let x = 0; let y = 0;
    let w = Math.ceil(intoStyle.width.substring(0, intoStyle.width.length - 2) / cols)
    let h = Math.ceil(intoStyle.height.substring(0, intoStyle.height.length - 2) / rows)
    h = w
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let block = new Block(x, y, w, h, i, j)
            blocks.push(block)
            into.appendChild(block.square)
            x += w
        }
        y += h
        x = 0
    }
}
insertBlocks()

let newColor = "red"
let originalColor = getComputedStyle(blocks[0].square).backgroundColor

// method 1 (random blocks light up)
function randomLight() {
    let starting = 5
    let originalColor = getComputedStyle(blocks[0].square).backgroundColor
    let newColor = 'red'
    let turnedOn = 0
    let maxOn = Math.floor(rows * cols * 0.3)
    // for (let i = 0; i < starting; i++) {
    //     let currentBlock = Math.floor(Math.random() * blocks.length)
    //     setTimeout(() => blocks[currentBlock].square.style.backgroundColor = 'red', 100)
    //     setTimeout(() => blocks[currentBlock].square.style.backgroundColor = originalColor, 3000)
    // }

    setInterval(() => {
        if (turnedOn < maxOn) {
            let currentBlock = Math.floor(Math.random() * blocks.length)
            turnedOn++
            setTimeout(() => {
                blocks[currentBlock].square.style.backgroundColor = newColor
            }, Math.floor(Math.random() * 6) * 100)

            setTimeout(() => {
                blocks[currentBlock].square.style.backgroundColor = originalColor
                turnedOn--
            }, (Math.floor(Math.random() * 3) + 1) * 1000)

        }
    }, 20/*0*/)
}
randomLight()

function hoverLight() {
    let originalColor = getComputedStyle(blocks[0].square).backgroundColor
    let newColor = 'red'

    for (let block of blocks) {
        block.square.addEventListener("mouseover", () => {
            setTimeout(() => block.square.style.backgroundColor = newColor, 20)
            setTimeout(() => block.square.style.backgroundColor = originalColor, 1000)
        })
    }
}
// hoverLight()