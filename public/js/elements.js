export const getIncomingCallDialog = (
  callTypeInfo,
  acceptCallHandler,
  rejectCallHandler
) => {
    
    console.log("getting incoming call dialog");
    const dialog = document.createElement("div");
    dialog.classList.add("dialog_wrapper");
    const dialogContent = document.createElement("div");
    dialogContent.classList.add("dialog_content");
    dialog.appendChild(dialogContent);

    const title = document.createElement("p");
    title.classList.add("dialog_title");
    title.innerHTML = `Incoming ${callTypeInfo} Call`;

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("dialog_image_container");
    const image = document.createElement("img");
    const avatarImagePath = "./utils/images/dialogAvatar.png";
    image.src = avatarImagePath;
    imageContainer.appendChild(image);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("dialog_button_container");

    const acceptCallButton = document.createElement("button");
    acceptCallButton.classList.add("dialog_accept_call_button");
    const acceptCallImg = document.createElement("img");
    acceptCallImg.classList.add("dialog_button_image");
    const acceptCallImgPath = "./utils/images/acceptCall.png";
    acceptCallImg.src = acceptCallImgPath;
    acceptCallButton.append(acceptCallImg);
    buttonContainer.appendChild(acceptCallButton);

    const rejectCallButton = document.createElement("button");
    rejectCallButton.classList.add("dialog_reject_call_button");
    const rejectCallImg = document.createElement("img");
    rejectCallImg.classList.add("dialog_button_image");
    const rejectCallImgPath = "./utils/images/rejectCall.png";
    rejectCallImg.src = rejectCallImgPath;
    rejectCallButton.append(rejectCallImg);
    buttonContainer.appendChild(rejectCallButton);

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainer);
    dialogContent.appendChild(buttonContainer);

    const dialogHTML = document.getElementById("dialog");
    dialogHTML.appendChild(dialog);
};