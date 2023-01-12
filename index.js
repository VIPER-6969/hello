//first we will import Socket IO at 8000 port 

const io = require('socket.io')(8000,{cors:{origin:'*',}})

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//empty users object
const users = {};


//when user enter it gives conections

io.on('connection', socket=>{
    socket.on('new-user', name=>{
        //appendin users in object
        users[socket.id]= name;
        //sending user join message to all when user join
        socket.broadcast.emit('user-joined',name)
    })
    
    socket.on('send',msg=>{
        //sending user message to all when user send message
        socket.broadcast.emit('recive',{message:msg , name: users[socket.id]})
    })
    //sending user message to all when user disconnect 
    socket.on('disconnect',msg=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id]
    })
})

