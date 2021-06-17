import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js'
import * as store from './store.js';

let connectedUserDetails;
let peerConnection;

const defaultConstrainst = {
    audio: true,
    video: true
}

const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:13902',
        },
    ],
};

export const getLocalPreview = () => {
    navigator.mediaDevices.getUserMedia(defaultConstrainst)
    .then((stream) => {
        ui.updateLocalVideo(stream);
        store.setLocalStream(stream);  
    }).catch((err) => {
        console.log('error occured when trying to get an access to camera');
        console.log(err);
    });
};

const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicecandidate = (event) => {
        console.log('getting ice candidate from stun server')
        if (event.candidate) {
            // send our ice candidate to other peer
        }
    
    }

    peerConnection.onconnectionstatechange = (event) => {
        if (peerConnection.connectionState === 'connected') {
            console.log('sucessfully connected with other peer');
        }
    }

    // receiving trakcs
    const remoteStream = new MediaStream();
    store.setRemoteStream(remoteStream);
    ui.updateRemoteVideo(remoteStream);

    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);
    }

    // add our stream to peer connection

    if (connectedUserDetails.callType === constants.callType.VIDEO_PERSONAL_CODE) {
        const localStream = store.getState().localStream;

        for (const track of localStream.getTracks()) {
            peerConnection.addTrack(track, localStream);
        }
    }
};

export const sendPreOffer = (callType, calleePersonalCode) => {
    //console.log('pre offer function executed');
    //console.log(callType);
    //console.log(calleePersonalCode);
    connectedUserDetails = {
        callType,
        socketId: calleePersonalCode
    };

    if (callType === constants.callType.CHAT_PERSONAL_CODE || callType === constants.callType.VIDEO_PERSONAL_CODE) {
        const data = {
            callType,
            calleePersonalCode
        };
        ui.showCallingDialog(callingDialogRejectedHandler);
        wss.sendPreOffer(data);
    };
};

export const handlePreOffer = (data) => {
    //console.log('pre-offer-came webRTC handler')
    //console.log(data);
    const { callType, callerSocketId } = data;

    connectedUserDetails = {
        socketId: callerSocketId,
        callType,
    };

    if (
        callType === constants.callType.CHAT_PERSONAL_CODE || 
        callType === constants.callType.VIDEO_PERSONAL_CODE
    ) {
        ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
    }
};

const acceptCallHandler = () => {
    console.log('call accepted');
    createPeerConnection();
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
    ui.showCallElements(connectedUserDetails.callType);
};

const rejectCallHandler = () => {
    console.log('call rejected');
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_REJECTED);
};

const callingDialogRejectedHandler = () => {
    console.log('rejecting the call');
};

const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    };
    ui.removeAllDialogs();
    wss.sendPreOfferAnswer(data);
};

export const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    //console.log('pre offer answer came');
    //console.log(data)
    ui.removeAllDialogs();

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        ui.showInfoDialog(preOfferAnswer);
        // Show dialog that callee has not been found 

    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
        ui.showInfoDialog(preOfferAnswer);
        // show dialog that callee is not able to connect
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
        ui.showInfoDialog(preOfferAnswer);
        // show dialog that call is rejected by the callee
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
        ui.showCallElements(connectedUserDetails.callType);
        createPeerConnection();
        // send webRTC offer 
        sendWebRTCOffer(); 
    }
};

const sendWebRTCOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.connectedUserSocketId,
        type: constants.webRTCSignaling.OFFER,
        offer: offer,
    });
};

export const handleWebRTCOffer = (data) => {
    console.log('webRTC ofer came');
    console.log(data)
}