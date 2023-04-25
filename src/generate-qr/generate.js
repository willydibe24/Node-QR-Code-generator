// Module to generate the QR Code

import { uploadFile } from '../firebase/firebase-storage';
import { authenticate } from '../auth/authentication.js';
import { createAuth } from '../firebase/firebase-config.js';


const auth = createAuth();

const errorMsg = document.querySelector('.error-msg');
const fileInput = document.querySelector('#file');
const loader = document.querySelector('#loader');
const qrCode = document.querySelector('#qr-code-image');



export async function send_input() {
    let textInput = document.getElementById('text').value;
    let input = "";
    let response = "";
    let data = "";

    // Gets text if not empty and if there aren't files
    if (textInput != "" && fileInput.files.length == 0) {
        document.querySelector('.content').style.display = "none";
        document.querySelector('.hidden').style.display = "flex";

        loader.style.display = "flex";
        qrCode.style.display = "none";

        input = textInput;

        response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(input)}`);
        data = await response.blob();

        loader.style.display = "none";
        qrCode.style.display = "flex";

        qrCode.src = URL.createObjectURL(data);
    }


    // Gets file if not empty
    if (fileInput.files.length != 0 && textInput == "") {
        let isAuthenticated = await authenticate();
        if (isAuthenticated === true) {
            var isVerified = auth.currentUser.emailVerified;
            if(isVerified) {
                
                document.querySelector('.content').style.display = "none";
                document.querySelector('.hidden').style.display = "flex";
        
                loader.style.display = "flex";
                qrCode.style.display = "none";
                
                input = fileInput.files[0];
                
                let url = await uploadFile(input);
                if (!url) {
                    console.log("non va un tubo");
                    return;
                }
                    
                console.log(`URL: ${url}`);
        
                response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${encodeURIComponent(url)}`);
                data = await response.blob();
        
                loader.style.display = "none";
                qrCode.style.display = "flex";
        
                qrCode.src = URL.createObjectURL(data);
            } 
        }
    }

    // Error messages
    if (fileInput.files.length == 0 && textInput == "") {
        errorMsg.innerHTML = "<p style = 'color: red;'>Inserisci un input.</p>";
    } else if (fileInput.files.length != 0 && textInput != "") {
        errorMsg.innerHTML = "<p style = 'color: red;'>Non puoi inserire 2 input contemporaneamente!</p>";
    } else if (fileInput.files.length != 0 && !isVerified) {
        errorMsg.innerHTML = '<p style = "color: red;">Per procedere devi prima verificare la tua email.</p>';
    } else {
        errorMsg.innerHTML = "";
    }
}