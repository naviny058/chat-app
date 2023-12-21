
const socket = io()
const textArea = document.querySelector('.textarea')
const messageArea = document.querySelector('.message_area')

let name;
do {
    name = prompt('please enter your name')
} while (!name)

textArea.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        sendMessage(textArea.value)

    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    appendmsg(msg, 'outgoing')
    textArea.value = ''

    //send to server
    socket.emit('message', msg)
}

function appendmsg(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message} </p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}
// Recieve message code
socket.on('message', (msg) => {
    appendmsg(msg, 'incoming')
    scrollBottom()
})

function scrollBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}