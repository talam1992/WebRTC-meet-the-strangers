let state = {
    socketId: null,
    localStream: null,
    remoteStream: null,
    screenSharingActive: false,
    screenSharingStream: null,
    allowConnectionFromStrangers: false
    
};

export const setSocketId = (socketId) => {
    state = {
        ...state,
        socketId,
    };
    console.log(state);
};

export const setLocalStream = (stream) => {
    state = {
        ...state,
        localStream: stream,
    };
};

export const setAllowConnectionFromStrangers = (allowConnection) => {
    state = {
        ...state,
        allowConnectionFromStrangers: allowConnection
    };
};

export const setScreenSharingActive = (screenSharingActive) => {
    state = {
        ...state,
        screenSharingActive,
    };
};

export const setScreenSharingStream = (screenSharingStream) => {
    state = {
        ...state,
        screenSharingStream,
    };
};

export const setRemoteStream = (stream) => {
    state = {
        ...state,
        remoteStream: stream,
    };
};

export const getState = () => {
    return state;
}