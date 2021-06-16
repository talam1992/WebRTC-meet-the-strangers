import * as wss from './wss.js';
import * as constants from './constants.js';
import * as ui from './ui.js'

let connectedUserDetails;

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
    sendPreOfferAnswer(constants.preOfferAnswer.CALL_ACCEPTED);
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

const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    //console.log('pre offer answer came');
    //console.log(data)
    ui.removeAllDialogs();

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        // Show dialog that callee has not been found 

    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
        // show dialog that callee is not able to connect
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_REJECTED) {
        // show dialog that call is rejected by the callee
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_ACCEPTED) {
        // send webRTC offer 
    }
}