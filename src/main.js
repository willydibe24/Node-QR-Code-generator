// Main module called in index.html
import '../style.css';
import { createAuth } from './firebase/firebase-config';
import { send_input } from "./generate-qr/generate.js";
import { regenerate } from "./generate-qr/regenerate.js";
import { animate_logButton, animate_regButton, animate_forgotButton } from './auth/button-animation.js';
import { authenticate, forgot_password } from './auth/authentication.js';
import { 
    show_log_password, 
    show_reg_password, 
    hide_auth_popup, 
    show_signup,
    show_signin,
    show_forgot,
    hide_forgot
} from "./auth/authentication-popup.js";
import {
    update_name,
    update_email,
    reset_password,
    user_logout,
    delete_user,
    resend_verification_email
} from './control-panel/c-panel.js'
import {
    show_c_panel,
    hide_c_panel,
    show_modify_username,
    show_modify_email
} from "./control-panel/c-panel-popup.js";
import { sanitizeInput } from './utilities/sanitize-input';



// AUTH CONSTANTS
const auth = createAuth();
const authCross = document.querySelector('#auth-cross');
const toggleLogPassword = document.querySelector('#log-password-toggle');
const toggleRegPassword = document.querySelector('#reg-password-toggle');
const otherwiseSignin = document.querySelector('#otherwise-signin');
const otherwiseSignup = document.querySelector('#otherwise-signup');
const forgotPassword = document.querySelector('.forgot-password');
const hideForgot = document.querySelector('.hide-forgot'); 
const sendForgot = document.querySelector('#forgot-button'); 

// CONTROL PANEL CONSTANTS
const userButton = document.querySelector('#user-icon');
const cPanelCross = document.querySelector('#user-cross');
const updateUsernameTrigger = document.querySelector('#trigger-update-name');
const updateEmailTrigger = document.querySelector('#trigger-update-email');
const resendVerifyContainer = document.querySelector('#resend-verify-container');
const resendVerifyButton = document.querySelector('#send-verify-email');
const sendUpdateUsername = document.querySelector('#send-update-name');
const sendUpdateEmail = document.querySelector('#send-update-email');
const resetPassword = document.querySelector('#reset-password');
const logoutButton = document.querySelector('#user-logout-button');
const deleteUser = document.querySelector('#delete-account');

// QR CODE CONSTANTS
const generateQrCode = document.querySelector('#generate');
const regenerateQrCode = document.querySelector('#new-qr');



// ------------ QR CODE POPUP CONTENT ------------ //

// Send QR code & generate new QR code
generateQrCode.addEventListener("click", () => {
    send_input();
})

regenerateQrCode.addEventListener("click", () => {
    regenerate();
})
        
// Button animation (transition from top to bottom)
animate_logButton();
animate_regButton();
animate_forgotButton();

// Toggles the password (visible/hidden)
toggleLogPassword.addEventListener('click', () => {
    show_log_password();
    toggleLogPassword.classList.toggle('fa-eye');    // shows the eye slash icon
})

toggleRegPassword.addEventListener('click', () => {
    show_reg_password();
    toggleRegPassword.classList.toggle('fa-eye');    // shows the eye slash icon
})

// Change between sign-in & sign-up
otherwiseSignin.addEventListener("click", () => {
    show_signin();
})

otherwiseSignup.addEventListener("click", () => {
    show_signup();
})






// ------------ AUTH PANEL POPUP CONTENT ------------ //

// Show/hide control panel (only if user is logged, otherwise log/reg is required)
userButton.addEventListener("click", () => {
    if(auth.currentUser) {
        show_c_panel();
        if (auth.currentUser.emailVerified) {
            resendVerifyContainer.style.display = "none";
        }
    } else {
        authenticate();
    }
})


// Show/hide forgot password popup
forgotPassword.addEventListener("click", () => {
    show_forgot();
})

hideForgot.addEventListener("click", () => {
    hide_forgot();
})

// Send reset email if password has been forgotten
sendForgot.addEventListener("click", () => {
    forgot_password();
})

// Hide auth popup
authCross.addEventListener("click", () => {
    hide_auth_popup();
})





// ------------ CONTROL PANEL POPUP CONTENT ------------ //

cPanelCross.addEventListener("click", () => {
    hide_c_panel();
})

// Resend verify email
resendVerifyButton.addEventListener("click", () => {
    let user = auth.currentUser;
    if (!user.emailVerified) {
        resend_verification_email();
    }
})

// Show modify username popup
updateUsernameTrigger.addEventListener("click", () => {
    show_modify_username();
})

// Show modify email popup
updateEmailTrigger.addEventListener("click", () => {
    show_modify_email();
})

// Update username 
sendUpdateUsername.addEventListener("click", () => {
    update_name();
})

// Update email
sendUpdateEmail.addEventListener("click", () => {
    update_email();
})

// Reset password
resetPassword.addEventListener("click", () => {
    reset_password();
})

deleteUser.addEventListener("click", () => {
    if(window.confirm("ATTENZIONE: L'azione è irreversibile.\n\nVuoi continuare?")) {
        delete_user();
    }
})

// Logout button
logoutButton.addEventListener("click", () => {
    user_logout();
})



// Sanitize all inputs
const inputs = document.querySelectorAll('input[type=text]');

inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
        const value = event.target.value;
        input.value = sanitizeInput(value);
    })
})