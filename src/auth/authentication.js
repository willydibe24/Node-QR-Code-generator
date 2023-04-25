import { 
    sendEmailVerification,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import { createAuth } from "../firebase/firebase-config";
import { show_auth_popup, hide_auth_popup } from "./authentication-popup.js";
import { firebaseErrors } from "../firebase/firebase-errors.js";


const auth = createAuth();

const expirePopupTime = 2000;   // In milliseconds

const logButtonContainer = document.querySelector('.send-auth-container-log');
const regButtonContainer = document.querySelector('.send-auth-container-reg');
const logButton = document.querySelector('#signin-button');
const regButton = document.querySelector('#signup-button');
const errorMsg = document.querySelector('.auth-error-msg');
const otherwiseLog = document.querySelector('#otherwise-signin');
const otherwiseReg = document.querySelector('#otherwise-signup');



export async function authenticate() {
    return new Promise((resolve, reject) => { 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(true);    // IF USER IS AUTHENTICATED, RETURN TRUE
            } else {
                show_auth_popup();
                logButton.addEventListener('click', async function(){
                    try {
                        let logEmail = document.querySelector('#log-email').value;
                        let logPassword = document.querySelector('#log-password').value;
            
                        await signInWithEmailAndPassword(auth, logEmail, logPassword);
            
                        otherwiseReg.style.display = "none";
                        logButtonContainer.style.display = "none";
                        logButton.style.display = "none";

                        errorMsg.innerHTML = `<p style = "color: green">Bentornato ${auth.currentUser.displayName}!</p>`;
            
                        resolve(true);

                        setTimeout(() => {
                            hide_auth_popup();
                        }, expirePopupTime);

                    } catch(err) {
                        errorMsg.innerHTML = `<p style = "color: red">${firebaseErrors[err.code] || err.message}</p>`;
                        reject(false);
                    }
                })
                
                regButton.addEventListener('click', async function(){
                    try {

                        let regEmail = document.querySelector('#reg-email').value;
                        let regPassword = document.querySelector('#reg-password').value;
                        let regPasswordValidate = document.querySelector('#reg-password-validate').value;

                        if (regPassword !== regPasswordValidate) {
                            errorMsg.innerHTML = "<p style = 'color: red;'>Le password inserite non coincidono.</p>";
                            reject(false);
                        }
                        
                        await createUserWithEmailAndPassword(auth, regEmail, regPassword);
                    
                        sendEmailVerification(auth.currentUser).then(() => {

                            otherwiseLog.style.display = "none";
                            regButtonContainer.style.display = "none";
                            regButton.style.display = "none";

                            try {
                                if (!(auth.currentUser.displayName)) {
                                    let displayName;
                                    displayName = regEmail.split("@").shift();
                                    updateProfile(auth.currentUser, {
                                        displayName: displayName
                                    })
                                }

                                errorMsg.innerHTML = `<p style = "color: green">Ti abbiamo inviato una mail di verifica.</p>`;
                                resolve(true);

                                setTimeout(() => {
                                    window.location.reload();
                                }, expirePopupTime);

                            } catch (err) {
                                errorMsg.innerHTML = `<p style = "color: red">${firebaseErrors[err.code] || err.message}</p>`;  
                                reject(false);
                        }})
                    } catch(err) {
                        errorMsg.innerHTML = `<p style = "color: red">${firebaseErrors[err.code] || err.message}</p>`;
                        reject(false);
                    }
                })       
            }
        });
    });
}


export function user_email() {
    let user = auth.currentUser;
    if(user) {
        return user.email;
    } return "";
}


export function forgot_password() {
    let userEmail = document.querySelector('#forgot-email').value;

    sendPasswordResetEmail(auth, userEmail).then(() => {
        errorMsg.innerHTML = `<p style = "color: green">Email inviata correttamente.</p>`;
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }).catch((err) => {
        errorMsg.innerHTML = `<p style = "color: red">${firebaseErrors[err.code] || err.message}</p>`;
    })
}