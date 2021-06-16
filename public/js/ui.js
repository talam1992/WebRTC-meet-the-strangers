import * as constants from "./constants.js";
import * as elements from "./elements.js";

export const updatePersonalCode =  (personalCode) => {
    const personalCodeParagraph = document.getElementById(
        'personal_code_paragraph'
    );
    personalCodeParagraph.innerHTML = personalCode;
};

export const showIncomingCallDialog = (
    callType, 
    acceptCallHandler, 
    rejectCallHnadler
    ) => {
        const callTypeInfo = 
        callType === constants.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";

        const incomingCallDialog = elements.getIncomingCallDialog(
            callTypeInfo, 
            acceptCallHandler, 
            rejectCallHnadler
        );

        // removing all dialogs inside HTML dialog element
        const dialog = document.getElementById('dialog');
        dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());
        
        dialog.appendChild(incomingCallDialog);
};

export const showCallingDialog = (rejectCallHnadler) => {
    const callingDialog = elements.getCallingDialog(rejectCallHnadler);

    // removing all dialogs inside HTML dialog element
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());

    dialog.appendChild(callingDialog);
};

export const showInfoDialog = (preOfferAnswer) => {
    let infoDialog = null;

    if (preOfferAnswer == constants.preOfferAnswer.CALL_REJECTED) {
        infoDialog = elements.getInfoDialog(
            "Call rejected",
            "Callee rejected your call"
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALLEE_NOT_FOUND) {
        infoDialog = elements.getInfoDialog(
            "Callee not found",
            "Please check personal code"
        );
    }

    if (preOfferAnswer === constants.preOfferAnswer.CALL_UNAVAILABLE) {
        infoDialog = elements.getInfoDialog(
            "Call is not possible",
            "Probably callee is busy. Please try again later"
        );
    }
    
    if (infoDialog) {
        const dialog = document.getElementById('dialog');
        dialog.appendChild(infoDialog);

        setTimeout(() => {
           removeAllDialogs(); 
        }, [4000]);
    }
};

export const removeAllDialogs = () => {
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());
}