import io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';

const socket = io(SERVER_URL);

export const joinRoom = (stockCode) => {
  if (stockCode) {
    socket.emit('joinRoom', stockCode);
  }
};

export const leaveRoom = (stockCode) => {
  if (stockCode) {
    socket.emit('leaveRoom', stockCode);
  }
};

export const subscribeNowPrice = (callback) => {
  socket.on('nowPrice', message => {
    callback(message);
  });

  return () => socket.off('nowPrice');
};

export const subscribeAskPrice = (callback) => {
    socket.on('askPrice', message => {
      callback(message);
    });
  
    return () => socket.off('askPrice');
};