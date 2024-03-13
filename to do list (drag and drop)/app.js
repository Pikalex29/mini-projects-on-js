const item = document.querySelector('.item')
const placeholders = document.querySelectorAll('.placeholder')

item.addEventListener('dragstart', dragstart)
item.addEventListener('dragend', dragend)

for (const placeholder of placeholders) {
    placeholder.addEventListener('dragover', dragover)
    placeholder.addEventListener('dragenter', dragenter)
    placeholder.addEventListener('dragleave', dragleave)
    placeholder.addEventListener('drop', dragdrop)
}

function dragstart() {
    this.classList.add('hold')
    setTimeout(() => this.classList.add('hide'), 0)
}


function dragend() {
    this.className = 'item'
}

function dragover(event) {
    event.preventDefault()
}

function dragenter() {
    this.classList.add('hovered')
}

function dragleave() {
    this.classList.remove('hovered')
}

function dragdrop() {
    this.classList.remove('hovered')
    this.append(item)
}