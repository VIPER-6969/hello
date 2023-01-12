
//Setting up Socket Io for http instance

const socket = io('http://localhost:8000');

//getting element for using

const chat_page = document.getElementById('container3');

const button_1 = document.getElementById('btn1');

const login_page = document.getElementById('container');

const form = document.getElementById('container3');

const message_input_ = document.getElementById('input');

const messageinput = document.getElementById('type-box');

//defining function for user on joining or leaving on page

const user_status = (user_join, position) => {
    //creating element div
    let user_name_container = document.createElement('div');
    //creating element div 
    let user_name_ = document.createElement('div');
    //giving div their class
    user_name_.classList = 'joined';
    //displaying user joined or left 
    user_name_container.innerText = user_join;
    //giving div their class
    user_name_container.classList.add(position);
    //appending div in message box
    messageinput.appendChild(user_name_);
    //appending div in message box
    user_name_.appendChild(user_name_container);
};
//defining function for user on sending messages
const user_message_appending = (user_message, position) => {
    //creating div for displaying messages
    let _user_message_container = document.createElement('div');
    //adding class to div
    _user_message_container.classList = 'first';
    //appending div 
    messageinput.appendChild(_user_message_container);
    //creating p (paragraph)
    let user_message_text = document.createElement('p');
    //adding class to p (paragraph)
    user_message_text.classList = 'message1';
    //adding another class to p (paragraph)
    user_message_text.classList.add('right');
    //appending p (paragraph) 
    _user_message_container.appendChild(user_message_text);
    //adding position to p (paragraph)
    _user_message_container.classList.add(position);
    //adding messgage to p (paragraph)
    user_message_text.innerText = user_message;
};
//listning when user submit message in the chat 
chat_page.addEventListener('submit', (page) => {
    //preventing page from realoding
    page.preventDefault();
    //setting user message value
    const user_chat_message = message_input_.value;
    //running user_message_appending function when user submit message in the chat 
    user_message_appending(`You:${user_chat_message}`, 'right');
    //listning when user send message in the chat 
    socket.emit('send', user_chat_message);

    message_input_.value = '';
});
//listning when user join the chat 
socket.on('user-joined', user_name => {

    user_status(`${user_name} joined th chat`, 'joined-user');

});
//listning when user recive message in the chat 
socket.on('recive', _user_message => {

    user_message_appending(`${_user_message.name}: ${_user_message.message}`, 'left');

});
//listning when user left the chat 
socket.on('leave', user_name => {

    user_status(`${user_name} left the chat`, 'joined-user');

});
//listning when user click on button 
button_1.addEventListener('click', (page) => {
    //adding display none to login page
    login_page.classList.add('active');
    //removing display none from chatpage 
    chat_page.classList.remove('active');
    //preventing page from realoding
    page.preventDefault();
    //getting username from input
    let _user_name = document.querySelector('input').value;

    if (_user_name.length == 0) {

        return;
    };
    //listning to new user joining
    socket.emit('new-user', _user_name);
});