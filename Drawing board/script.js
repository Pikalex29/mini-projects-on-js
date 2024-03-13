const board = document.querySelector('#board');
const SQUARES_NUMBER = 780;
const toggleButton = document.querySelector('#darkModeToggle');
//const colors = ['#FF1493 ', '#FF00FF ', '#DA70D6 ', '#C71585 ', '#FFA07A ', '#FF7F50 '];

toggleButton.addEventListener('click', toggleDarkMode);

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseleave', () => removeColor(square));

    board.append(square);
}

function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(element) {
    element.style.backgroundColor = '#6FB3D2';
    element.style.boxShadow = `0 0 3px #295F73`;
}

function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;

    //const index = Math.floor(Math.random() * colors.length);
    //return colors[index];
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    toggleButton.classList.toggle('dark-mode');
}