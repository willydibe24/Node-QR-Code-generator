const userIcon = document.querySelector('#user-icon');

const signin_window = document.querySelector('#user-signin');
const signup_window = document.querySelector('#user-signup');
const forgot_window = document.querySelector('.forgot-container');

const logPassword = document.querySelector('#log-password');
const regPassword = document.querySelector('#reg-password');
const errorMsg = document.querySelector('.auth-error-msg');

const popup = document.querySelector('.authentication');
const transitionTime = .2
popup.style.transition = `opacity ${transitionTime}s ease`;



export function show_auth_popup() {
    userIcon.style.display = "none";
    popup.style.visibility = "visible";
    popup.style.opacity = 1;
}

export function hide_auth_popup() {
    userIcon.style.display = "flex";
    popup.style.opacity = 0;

    setTimeout(() => {
        popup.style.visibility = "hidden";
    }, transitionTime / 2 * 1000);
}

export function show_log_password() {
    const type = logPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    logPassword.setAttribute('type', type);
}

export function show_reg_password() {
    const type = regPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    regPassword.setAttribute('type', type);
}

export function show_signup() {
    signin_window.style.display = "none";
    signup_window.style.display = "flex";
    errorMsg.innerHTML = "";
}

export function show_signin() {
    signup_window.style.display = "none";
    signin_window.style.display = "flex";
    errorMsg.innerHTML = "";
}

export function show_forgot() {
    signin_window.style.display = "none";
    forgot_window.style.display = "flex";
    errorMsg.innerHTML = "";
}

export function hide_forgot() {
    signin_window.style.display = "flex";
    forgot_window.style.display = "none";
    errorMsg.innerHTML = "";
}