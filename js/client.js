const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

form.addEventListener('submit', (arrow)=>{
    arrow.preventDefault();
    const message = messageInput.value;
    const meValue = 'You';
    append(meValue, message, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    
})

const append = (name, message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<span class="name">${name}:</span>${message}<span class="data"> </span>`;

    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // console.log(messageElement);

}

const joinMessage = 'joined the chat';

socket.on('user-joined', name =>{
    append(name, joinMessage, 'right')
})

socket.on('receive', data =>{
    append(data.name, data.message, 'left')
})

socket.on('left', name =>{
    append(name, 'left the chat', 'left')
})