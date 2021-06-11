import * as store from './store.js';
import * as wss from './wss.js';


// initialization of socketIO connection
const socket = io("/");
wss.registerSocketEvents(socket);

//register event listener for personal code copy button
const personalCodeCopyButton = document.getElementById(
  "personal_code_copy_button"
);
personalCodeCopyButton.addEventListener("click", () => {
  const personalCode = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personalCode);
});
