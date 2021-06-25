import * as wss from "./wss.js";

let strangerCallType;

export const changeStrangerConnectionStatus = (status) => {
    const data = { status };
    wss.changeStrangerConnectionStatus(data);
};

export const getStrangerSocketIdAndConnect = (callType) => {
    strangerCallType = callType;
    wss.getStrangerSocketId();
};

export const connectWithStranger = (data) => {
    console.log(data.randomStrangerSocketId);
}