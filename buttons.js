// preset opener
const presetOpener = document.querySelector('.preset-opener')
const presets = document.querySelector('.presets')
const arrow = document.querySelector('.preset-opener i')
presets.style.height = "0%"
let opened = false
presetOpener.addEventListener('click', () => {
    if (opened) {
        presets.style.height = "0%"
    } else {
        presets.style.height = "30%"
    }
    arrow.classList.toggle('rotate')
    opened = !opened
})
