
###     QR Code Generator App     ###



This is a QR code generator app made with Node.js and Vite.js. It can generate QR codes in two ways - By typing some text/url's or by uploading a file. It uses an API which in both cases reads an URL and converts it to a QR code.



### Generating QR codes via API ###

To generate a QR code via API, the app uses the API available at this URL: https://goqr.me/api/. The API allows the app to create QR codes by sending requests to the API endpoint (see generate.js)



### Generating QR codes from uploaded files ###

To generate a QR code from an uploaded file, the app uses the same API, which has been mentioned before. When a file is uploaded to the app, it is stored in a Firebase Cloud Storage directory. The app then sends a request to the API with the URL of the uploaded file to generate the QR code (see firebase-storage.js and firebase-get-url.js).




### Setting up the app ###

To use the app, follow these steps:

- Clone the repository to your local machine. 
- Install all the dependencies by running npm install.
- Set up a Firebase account and create a new Firebase Cloud Storage directory.
- Change the parameters in "firebase-config.js" with your parameters.
- Run the app with npm run dev.




### Frontend tooling ###

The app uses Vite.js as a frontend tooling to bundle and serve the frontend code. Vite.js provides fast development and build times with features like hot module replacement and a dev server with support for modern browsers.




### Usage ###

Once the app is set up, you can finally generate your QR codes!
If you are going to generate QR codes by uploading files, you can get the URL of the file stored in Firebase Cloud Storage from the browser's console.  



### Conclusion ###

This is a simple but powerful QR code generator app made with Node.js and Vite.js. It allows you to generate QR in a very easy way. Give it a try and see how it can help you in your projects!


