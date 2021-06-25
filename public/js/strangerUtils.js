import * as wss from "./wss.js";

export const changeStrangerConnectionStatus = (status) => {
    const data = { status };
    wss.changeStrangerConnectionStatus(data);
};