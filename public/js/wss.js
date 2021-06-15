import * as store from './store.js';
import * as ui from './ui.js';
import * as webRTCHandler from './webRTCHandler.js';

let socketIO = null;

export const registerSocketEvents =  (socket) => {
    socketIO = socket
    socket.on('connect', () => {
        console.log('successfully connected to socket.io server');
        // console.log(socket.id);
        store.setSocketId(socket.id);
        ui.updatePersonalCode(socket.id);
    });

    socket.on('pre-offer', (data) => {
        //console.log('pre-offer came');
        webRTCHandler.handlePreOffer(data);
    });
};

export const sendPreOffer = (data) => {
    console.log('emmitting to server pre-offer event');
    socketIO.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
    socketIO.emit('pre-offer-answer', data);
};
