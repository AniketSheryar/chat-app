const socket = io();

const form = document.getElementById('send_conatainer');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".container");

// for message 
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;

}


// Taking name of the new user
const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

// for sending messages 
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})


// Broadcast all user has joined
socket.on('user-joined', name  => {
    append(`${name} joined the chat`, 'left')
})

// To display msg to all
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');
});

// To show user has laft the chat
socket.on('left', data =>{
    append(`${data} left the chat`, 'left');
});

