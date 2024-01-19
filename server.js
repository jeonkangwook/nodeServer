const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 루트 경로에 접속했을 때 소켓 연결을 허용
io.on('connection', (socket) => {
  console.log('Client connected');

  // 클라이언트로부터의 메시지 수신
//   socket.on('message', (data) => {
//     console.log('Received message:', data);

//     // 클라이언트에게 메시지 전송
//     io.emit('message', { text: 'Server says: Hello!' });
//   });
  socket.on('chat-message', (data) => {
    console.log('Received chat message:', data);

    // 클라이언트에게 메시지 전송
    io.emit('message', data);
  });

  // 연결 해제 시 처리
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});