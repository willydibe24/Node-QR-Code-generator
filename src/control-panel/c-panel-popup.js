import { hello_user } from "./c-panel.js";
import { user_email } from "../auth/authentication.js";

const popup = document.querySelector('.control-panel');
const userIcon = document.querySelector('#user-icon');
const modUsernameContainer = document.querySelector('#hidden-update-name');
const modEmailContainer = document.querySelector('#hidden-update-email');
const currentEmailParagraph = document.querySelector('#current-email');


const transitionTime = .2
popup.style.transition = `opacity ${transitionTime}s ease`;

export function show_c_panel() {
    hello_user();
    userIcon.style.display = "none";
    popup.style.visibility = "visible";
    popup.style.opacity = 1;
}

export function hide_c_panel() {
    popup.style.opacity = 0;
    userIcon.style.display = "flex";
    
    setTimeout(() => {
        popup.style.visibility = "hidden";
    }, transitionTime / 2 * 1000);
}

export function show_modify_username() {
    modUsernameContainer.style.display = "flex";
}

export function hide_modify_username() {
    modUsernameContainer.style.display = "none";
}

export function show_modify_email() {
    let email = user_email();
    currentEmailParagraph.innerHTML = `<span>Email attuale:<br>${email}</span>`;
    modEmailContainer.style.display = "flex";
}

export function hide_modify_email() {
    modEmailContainer.style.display = "none";
}