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

export const removeAllDialogs = () => {
    const dialog = document.getElementById('dialog');
    dialog.querySelectorAll('*').forEach((dialog) => dialog.remove());
}