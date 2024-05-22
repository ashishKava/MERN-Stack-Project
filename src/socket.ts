import { Server } from 'socket.io';

const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('taskCreated', (task) => {
      io.emit('taskCreated', task);
    });

    socket.on('taskUpdated', (task) => {
      io.emit('taskUpdated', task);
    });

    socket.on('taskDeleted', (taskId) => {
      io.emit('taskDeleted', taskId);
    });
  });
};

export default socketHandler;
