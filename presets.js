import {arr, Square, alive} from './script.js'
let body = document.body;

class StaticSquare extends Square {

    constructor(x, y, w, h, row, col) {
        super()
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
        this.square.className = "square"
    }

}
class Preset {
    constructor(preset) {
        this.preset = preset
        this.squareArray = [];
        this.createElement(document.querySelector('.presets'))
    }

    createElement(into) {
        let element = document.createElement('div')
        element.className = "preset"
        element.addEventListener('click', () => this.applyPreset())
        element.addEventListener('mouseenter', () => {
            for (let i = 0; i < this.squareArray.length; i++) {
                for (let j = 0; j < this.squareArray[i].length; j++) {
                    if (this.squareArray[i][j].clicked) {
                        this.squareArray[i][j].square.style.backgroundColor = this.squareArray[i][j].clickedColorHover
                    } else {
                        this.squareArray[i][j].square.style.backgroundColor = this.squareArray[i][j].primaryColorHover
                    }
                }
            }
        })
        element.addEventListener('mouseleave', () => {
            for (let i = 0; i < this.squareArray.length; i++) {
                for (let j = 0; j < this.squareArray[i].length; j++) {
                    if (this.squareArray[i][j].clicked) {
                        this.squareArray[i][j].square.style.backgroundColor = this.squareArray[i][j].clickedColor
                    } else {
                        this.squareArray[i][j].square.style.backgroundColor = this.squareArray[i][j].primaryColor
                    }
                }
            }
        })
        into.appendChild(element)
        this.generateSquares(element)
    }

    generateSquares(into) {
        let width = this.preset[0].length
        let height = this.preset.length
        let intoStyle = getComputedStyle(into)
        let x = 0;
        let y = 0;
        let w = intoStyle.minWidth.substring(0, intoStyle.minWidth.length - 2) / width;
        let h = intoStyle.height.substring(0, intoStyle.height.length - 2) / height;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (i == 0) {
                    this.squareArray.push([])
                }
                let pull = this.squareArray.pop()
                let square = new StaticSquare(x, y, w, h, i, j)
                pull.push(square)
                this.squareArray.push(pull)
                if (this.preset[i][j] == 1) {
                    square.clicked = true
                    square.updateState()
                }
                into.appendChild(square.square)
                x += w
            }
            y += h
            x = 0
        }
    }

    applyPreset() {
        for (let row of arr) {
            for (let square of row) {
                square.clicked = false
                square.updateState()
            }
        }
        while (alive.length > 0) {
            alive.pop()
        }
        let startRow = parseInt(((arr.length / 2)  - this.preset.length / 2))
        let startCol = parseInt(((arr[0].length / 2)  - this.preset[0].length / 2))
        const startColCopy = startCol;
        for (let i = 0; i < this.preset.length; i++) {
            for (let j = 0; j < this.preset[i].length; j++) {
                if (this.preset[i][j] == 1) {
                    arr[startRow][startCol].clicked = true
                    arr[startRow][startCol].updateState()
                    alive.push([startRow, startCol])
                }
                startCol++
            }
            startRow++
            startCol = startColCopy
        }
    }
}
let preset1 = new Preset([
    [0,1,1,1],
    [0,0,0,1],
    [0,0,1,0]
])
let preset2 = new Preset([
    [0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0],
    [0,0,0,1,0,0,0],
    [1,1,0,0,1,1,1],
    [0,0,0,0,0,0,0]
])