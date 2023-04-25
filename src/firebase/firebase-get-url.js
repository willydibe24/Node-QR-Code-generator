import {
    getStorage,
    ref,
    getDownloadURL
} from "firebase/storage";

export function getUrl(filename) {
    return new Promise((resolve, reject) => {
        // Create a reference to the file we want to download
        const storage = getStorage();
        const fileRef = ref(storage, filename);

        // Get the download URL
        getDownloadURL(fileRef).then((url) => {
                resolve(url);
            })
            .catch((err) => {
                switch (err.code) {
                    case 'storage/object-not-found':
                        reject("Il file cercato non esiste");
                        break;
                    case 'storage/unauthorized':
                        reject("Non hai i permessi necessari per accedere alla risorsa richiesta");
                        break;
                    case 'storage/canceled':
                        reject("Upload cancellato");
                        break;
                    case 'storage/unknown':
                        reject("Errore generico. Ricarica la pagina.");
                        break;
                }
                return false;
            });
    })
}