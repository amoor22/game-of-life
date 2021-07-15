let body = document.body;

let mouseDown;

let width = 35
let height = 12
let mainContainer = document.querySelector(".main-container")
let bigger = getComputedStyle(body).width > getComputedStyle(body).height ? getComputedStyle(body).width : getComputedStyle(body).height
let resetButton = document.querySelector(".reset")
let updateButton = document.querySelector('.update')
let mainContainerStyle = getComputedStyle(mainContainer);

export let arr = [];
export let alive = [];

function updateCell(row, col) {
    let aliveAround = 0
    row = parseInt(row)
    col = parseInt(col)
    let instruction;
    try {
        // check up
        if (row > 0) {
            if (arr[row - 1][col].clicked) {
                aliveAround++
            }
            // check top left
            if (col > 0) {
                if (arr[row - 1][col - 1].clicked) {
                    aliveAround++
                }
            }
            // check top right
            if (col < arr[row].length - 1) {
                if (arr[row - 1][col + 1].clicked) {
                    aliveAround++
                }
            }
        }
        // check down
        if (row < arr.length - 1) {
            if (arr[row + 1][col].clicked) {
                aliveAround++
            }
            // check bottom left
            if (col > 0) {
                if (arr[row + 1][col - 1].clicked) {
                    aliveAround++
                }
            }
            // check bottom right
            if (col < arr[row].length - 1) {
                if (arr[row + 1][col + 1].clicked) {
                    aliveAround++
                }
            }
        }
        // check left
        if (col > 0) {
            if (arr[row][col - 1].clicked) {
                aliveAround++
            }
        }
        // check right
        if (col < arr[row].length - 1) {
            if (arr[row][col + 1].clicked) {
                aliveAround++
            }
        }
    } catch {
        return
    }
    // Action after cacluating number of neighbours
    if (arr[row][col].clicked) {
        if (aliveAround < 2) {
            instruction = `${row},${col} rem`
            // arr[row][col].clicked = false
        } else if (aliveAround > 3) {
            instruction = `${row},${col} rem`
            // arr[row][col].clicked = false
        } else {
            instruction = `${row},${col} add`
        }
        // keep if has 2 or 3 alive neighbors
    } else {
        if (aliveAround == 3) {
            instruction = `${row},${col} add`
            // arr[row][col].clicked = true
        }
    }
    // arr[row][col].updateState()
    return instruction
}

function update() {
    let instructions = []
    for (let j of alive) {
        let row = parseInt(j[0])
        let col = parseInt(j[1])
        instructions.push(updateCell(row, col))
        
        instructions.push(updateCell(row + 1, col))
        instructions.push(updateCell(row - 1, col))

        instructions.push(updateCell(row, col - 1))
        instructions.push(updateCell(row, col + 1))
        
        instructions.push(updateCell(row + 1, col + 1))
        instructions.push(updateCell(row + 1, col - 1))
        
        instructions.push(updateCell(row - 1, col + 1))
        instructions.push(updateCell(row - 1, col - 1))
    }
    alive = []
    for (let instruction of instructions) {
        if (instruction) {
            executeInstruction(instruction)
        }
    }
}

function executeInstruction(instruction) {
    let action = instruction.split(" ")[1]
    let row = parseInt(instruction.split(" ")[0].split(",")[0])
    let col = parseInt(instruction.split(" ")[0].split(",")[1])
    if (action == "add") {
        arr[row][col].clicked = true
        arr[row][col].updateState()
        if (alive.findIndex((item) => JSON.stringify([row, col]) == JSON.stringify(item)) == -1) {
            alive.push([row, col])
        }
    } else if (action == "rem") { // won't do anything as we are clearing "alive" array
        arr[row][col].clicked = false
        arr[row][col].updateState()
        alive.filter((item) => {
            return !(JSON.stringify([row, col]) == JSON.stringify(item))
        })
    }
}

export class Square {
    primaryColor = "lightBlue"
    clickedColor = "#282828"
    primaryColorHover = "green"
    clickedColorHover = "#ffffff"

    clicked = false
    constructor(x, y, w, h, row, col) {
        this.square = document.createElement("div")
        this.initSquare(x, y, w, h, row, col)
    }

    initSquare(x, y, w, h, row, col) {
        this.square.addEventListener('mouseenter', squareMouseEnter)
        this.square.addEventListener('click', squareClick)
        this.square.setAttribute('draggable', false);
        this.square.style.position = 'absolute'
        this.square.style.left = `${x}px`
        this.square.style.top = `${y}px`
        this.square.style.width = `${w}px`;
        this.square.style.height = `${h}px`;
        this.square.setAttribute('place', `${row} ${col}`)
        this.square.className = "square"
    }

    click() {
        this.clicked = true
        this.square.style.backgroundColor = this.clickedColor;
    }
    
    unclick() {
        this.clicked = false
        this.square.style.backgroundColor = this.primaryColor;
    }

    updateState() {
        if (this.clicked) {
            this.click()
        } else {
            this.unclick()
        }
    }
}
function generateSquares(into) {
    let x = 0;
    let y = 0;
    let w = Math.ceil(mainContainerStyle.width.substring(0, mainContainerStyle.width.length - 2) / width)
    let h = Math.ceil(mainContainerStyle.height.substring(0, mainContainerStyle.height.length - 2) / height)
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (j == 0) {
                arr.push([])
            }
            let square = new Square(x, y, w, h, i, j)
            let pull = arr.pop()
            pull.push(square)
            arr.push(pull)
            into.appendChild(square.square)
            x += w
        }
        y += h
        x = 0
    }
}

document.addEventListener('mousedown', (e) => mouseDown = true)
document.addEventListener('mouseup', (e) => mouseDown = false)
resetButton.addEventListener('click', () => {
    for (let butArr of arr) {
        for (let button of butArr) {
            button.unclick()
        }
    }
    alive = []
})
updateButton.addEventListener('click', update)

function squareMouseEnter() {
    let row = parseInt(this.getAttribute("place").split(" ")[0])
    let col = parseInt(this.getAttribute("place").split(" ")[1])
    if (mouseDown) {
        arr[row][col].click()
        alive.push([row, col])
    }
}
function squareClick() {
    let row = parseInt(this.getAttribute("place").split(" ")[0])
    let col = parseInt(this.getAttribute("place").split(" ")[1])
    arr[row][col].click()
    alive.push([row, col])
}
window.addEventListener('resize', () => generateSquares(mainContainer))
window.addEventListener('keypress', (event) => {
    if (event.key == " ") {
        update()
    }
})
window.addEventListener('keypress', (event) => {
    if (event.key == "r") {
        for (let butArr of arr) {
            for (let button of butArr) {
                button.unclick()
            }
        }
        alive = []
    }
})
generateSquares(mainContainer)