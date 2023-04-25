const logEmail = document.querySelector('#log-email');
const logPassword = document.querySelector('#log-password');
const logButton = document.querySelector('#signin-button');

const regEmail = document.querySelector('#reg-email');
const regPassword = document.querySelector('#reg-password');
const regPasswordValidate = document.querySelector('#reg-password-validate');
const regButton = document.querySelector('#signup-button');

const forgotEmail = document.querySelector('#forgot-email');
const forgotButton = document.querySelector('#forgot-button');


// Show/hide log button
export const animate_logButton = () => {
    [logEmail, logPassword].forEach((element) => {
        element.addEventListener('keyup', () => {
            if (logEmail.value != 0 && logPassword.value != 0) {
                logButton.style.visibility = "visible";
                logButton.style.zIndex = "0";
                logButton.style.marginTop = "0";
                logButton.style.marginBottom = "10px";
                logButton.style.width = "100%";
                logButton.style.padding = "10px 0";
                logButton.style.fontSize = "inherit";
            } else {
                logButton.style.visibility = "hidden";
                logButton.style.zIndex = "-1";
                logButton.style.marginTop = "-45px";
                logButton.style.marginBottom = "30px";
                logButton.style.width = "0";
                logButton.style.padding = "0";
                logButton.style.fontSize = "0";
            }
        })
    })
}


// Show/hide reg button
export const animate_regButton = () => {
    [regEmail, regPassword, regPasswordValidate].forEach((element) => {
        element.addEventListener('keyup', () => {
            if (
                regEmail.value != 0 &&
                regPassword.value != 0 &&
                regPasswordValidate.value != 0 &&
                regPassword.value === regPasswordValidate.value
                ) {
                regButton.style.visibility = "visible";
                regButton.style.zIndex = "0";
                regButton.style.marginTop = "0";
                regButton.style.marginBottom = "10px";
                regButton.style.width = "100%";
                regButton.style.padding = "10px 0";
                regButton.style.fontSize = "inherit";
                
            } else {
                regButton.style.visibility = "hidden";
                regButton.style.zIndex = "-1";
                regButton.style.marginTop = "-45px";
                regButton.style.marginBottom = "30px";
                regButton.style.width = "0";
                regButton.style.padding = "0";
                regButton.style.fontSize = "0";
            }
        })
    })
}

export const animate_forgotButton = () => {
    forgotEmail.addEventListener('keyup', () => {
        if (forgotEmail.value != 0) {
            forgotButton.style.visibility = "visible";
            forgotButton.style.zIndex = "0";
            forgotButton.style.marginTop = "0";
            forgotButton.style.marginBottom = "10px";
            forgotButton.style.width = "100%";
            forgotButton.style.padding = "10px 0";
            forgotButton.style.fontSize = "inherit";
        } else {
            forgotButton.style.visibility = "hidden";
            forgotButton.style.zIndex = "-1";
            forgotButton.style.marginTop = "-45px";
            forgotButton.style.marginBottom = "30px";
            forgotButton.style.width = "0";
            forgotButton.style.padding = "0";
            forgotButton.style.fontSize = "0";
        }
    })
}