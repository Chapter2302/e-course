import io from 'socket.io-client';

const url = "http://localhost:4000";

let socket = undefined

function initialiseSocket() {
    socket = io(url);
}

export function addEventListener(event) {
    if (!socket) {
        initialiseSocket();
    }

    socket.on(event.type, event.callback);
}

export function sendEvent(event) {
    socket.emit(event.type, event.data);
}