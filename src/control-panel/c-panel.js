import { createAuth } from "../firebase/firebase-config.js";
import { 
    updateProfile, 
    updateEmail, 
    updatePassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    deleteUser
} from "firebase/auth";
import { firebaseErrors } from "../firebase/firebase-errors.js";

const auth = createAuth();
const errorMsg = document.querySelector('.c-panel-error-msg');
const refreshTime = 2000;   // Time to refresh the page (in milliseconds)


export function hello_user() {
    if(auth.currentUser) {
        if(auth.currentUser.emailVerified) {
            errorMsg.innerHTML = `<p style = "color: green";>Ciao ${auth.currentUser.displayName}</p>`;
        } else {
            errorMsg.innerHTML = '<p style = "color: rgb(255, 123, 0);">Attenzione, devi ancora confermare la tua email!</p>';
        }
    }
}


export async function update_name() {
    let name = document.querySelector('#update-name').value;
    try {
        if (!name) {
            throw ("Inserisci uno username valido.");
        }

        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            errorMsg.innerHTML = '<p style = "color: green;">Nome aggiornato correttamente.</p>';
            setTimeout(() => {
                window.location.reload()
            }, refreshTime);
    
        }).catch((err) => {
            errorMsg.innerHTML = `<p style = "color: red;">${firebaseErrors[err.code] || err.message}</p>`;
        })
    } catch(err) {
        errorMsg.innerHTML = `<p style = "color: red;">${err}</p>`;
    }
}


export async function update_email() {
    let email = document.querySelector('#update-email').value;
    
    try {
        if (!email) {
            throw "Inserisci un indirizzo email valido.";
        }

        updateEmail(auth.currentUser, email).then(() => {
            sendEmailVerification(auth.currentUser);
            errorMsg.innerHTML = '<p style = "color: green;">Email aggiornata correttamente.</p>';
            
            setTimeout(() => {
                window.location.reload()
            }, refreshTime);
    
        }).catch((err) => {
            errorMsg.innerHTML = `<p style = "color: red;">${firebaseErrors[err.code] || err.message}</p>`;
        }) 
    } catch(err) {
        errorMsg.innerHTML = `<p style = "color: red;">${err}</p>`;
    }
}


export async function update_password() {
    let newPassword = document.querySelector('#update-password').value;
    updatePassword(auth.currentUser, newPassword).then(() => {
        errorMsg.innerHTML = '<p style = "color: green;">Password aggiornata correttamente.</p>';
        setTimeout(() => {
            window.location.reload()
        }, refreshTime);

    }).catch((err) => {
        errorMsg.innerHTML = `<p style = "color: red;">${firebaseErrors[err.code] || err.message}</p>`;
    })
}


export async function reset_password() {
    sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
        errorMsg.innerHTML = '<p style = "color: green;">Email inviata correttamente.</p>';
        setTimeout(() => {
            window.location.reload()
        }, refreshTime);

    }).catch((err) => {
        errorMsg.innerHTML = `<p style = "color: red;">${firebaseErrors[err.code] || err.message}</p>`;
    })
}


export function user_logout() { 
    let user = auth.currentUser;
    if(user) {
            signOut(auth).then(() => {
                errorMsg.innerHTML = '<p style = "color: green;">Logout effettuato.</p>';
                setTimeout(() => {
                    window.location.reload()
                }, refreshTime);
            }).catch((err) => {
            errorMsg.innerHTML = `<p style = "color: red;">Logout non riuscito: ${firebaseErrors[err.code] || err.message}</p>`;
        }) 
    } else {
        errorMsg.innerHTML = '<p style = "color: red;">Logout già effettuato.</p>';
        setTimeout(() => {
            window.location.reload()
        }, refreshTime);
    }
}


export async function delete_user() {
    deleteUser(auth.currentUser).then(() => {
        errorMsg.innerHTML = '<p style = "color: green;">Account eliminato correttamente.</p>';
        setTimeout(() => {
            window.location.reload()
        }, refreshTime);

    }).catch((err) => {
        if(err.code == "auth/requires-recent-login") {
            errorMsg.innerHTML = '<p style = "color: red";>Accedi nuovamente per eliminare il tuo account</p>';
            user_logout();
            setTimeout(() => {
                window.location.reload()
            }, refreshTime);

        } else {
            errorMsg.innerHTML = `<p style = "color: red;">${firebaseErrors[err.code] || err.message}</p>`;
        }
    })
}

export function resend_verification_email() {
    sendEmailVerification(auth.currentUser).then(() => {
        setTimeout(() => {
            errorMsg.innerHTML = '<p style = "color: green;">Email di verifica reinviata.</p>';
        }, refreshTime / 2);
    }).catch ((err) => {
        errorMsg.innerHTML = `<p style = "color: red">${firebaseErrors[err.code] || err.message}</p>`;
    })
}


